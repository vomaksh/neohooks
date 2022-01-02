package services

import (
	"context"
	"fmt"

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

func (ws *WebhookService) Retrieve(id string) (*Webhook, error) {
	// Fetch webhook from HSet
	webhook, err := ws.DB.HGet(ctx, "webhooks", id).Result()
	if err != nil {
		return nil, err
	}
	// Fetch requests of webhook
	webhookRequests, err := ws.DB.ZRange(ctx, fmt.Sprintf("webhook:%s:requests", id), 0, -1).Result()
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
	}, nil
}

func (ws *WebhookService) Save() (string, error) {
	webhookId := uuid.Must(uuid.NewRandom()).String()
	_, err := ws.DB.HSet(ctx, "webhooks", map[string]string{
		fmt.Sprintf("%s", webhookId): "true",
	}).Result()
	return webhookId, err
}

func (ws *WebhookService) Remove(id string) string {
	ws.DB.HDel(ctx, "webhooks", id)
	return id
}
