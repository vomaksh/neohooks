package services

import (
	"context"
	"fmt"
	"log"

	"github.com/go-redis/redis/v8"
	"github.com/google/uuid"
	"github.com/iyorozuya/neohooks/api/structs"
)

type WebhookService struct {
	DB                    *redis.Client
	WebhookRequestService WebhookRequestService
}

type Webhook struct {
	ID       string
	Requests []structs.WebhookRequestList
	Page     int64
	Total    int64
	Rows     int64
}

var ctx context.Context = context.Background()

func (ws *WebhookService) List() ([]string, error) {
	webhooks, err := ws.DB.HGetAll(ctx, "webhooks").Result()
	switch {
	case err == redis.Nil:
		return []string{}, nil
	case err != nil:
		return []string{}, err
	}
	var activeWebhooks []string
	for webhook, state := range webhooks {
		if state == "true" {
			activeWebhooks = append(activeWebhooks, webhook)
		}
	}
	return activeWebhooks, nil
}

func (ws *WebhookService) Retrieve(id string, page int64) (*Webhook, error) {
	// Fetch webhook from HSet
	webhook, err := ws.DB.HGet(ctx, "webhooks", id).Result()
	if err != nil {
		return nil, err
	}
	// Fetch requests of webhook
	var rowCount int64 = 10
	webhookRequestsCount := ws.DB.ZCount(ctx, fmt.Sprintf("webhook:%s:requests", id), "-inf", "+inf")
	webhookRequests, err := ws.DB.ZRevRange(
		ctx,
		fmt.Sprintf("webhook:%s:requests", id), rowCount*page, rowCount*(page+1)-1,
	).Result()
	if err != nil {
		return nil, err
	}
	webhookRequestsList, err := ws.WebhookRequestService.retrieveByIDs(webhookRequests)
	if err != nil {
		return nil, err
	}
	if webhook == "" {
		return nil, fmt.Errorf("%s doesn't exist", id)
	}
	return &Webhook{
		ID:       id,
		Requests: *webhookRequestsList,
		Page:     page,
		Total:    webhookRequestsCount.Val(),
		Rows:     rowCount,
	}, nil
}

func (ws *WebhookService) Subscribe(id string) <-chan *redis.Message {
	sub := ws.DB.Subscribe(ctx, fmt.Sprintf("webhook:%s:requests", id))
	iface, err := sub.Receive(ctx)
	if err != nil {
		log.Println("unable to receive data")
	}

	switch iface.(type) {
	case *redis.Subscription:
		log.Println("Yeah, things somewhat work")
	case *redis.Message:
		log.Println("received message")
	case *redis.Pong:
		log.Println("pong received")
	default:
		log.Panicln("some error occured")
	}

	ch := sub.Channel()
	return ch
}

func (ws *WebhookService) Save() (string, error) {
	webhookId := uuid.Must(uuid.NewRandom()).String()
	_, err := ws.DB.HSet(ctx, "webhooks", map[string]string{
		webhookId: "true",
	}).Result()
	return webhookId, err
}

func (ws *WebhookService) Remove(id string) string {
	ws.DB.HDel(ctx, "webhooks", id)
	return id
}
