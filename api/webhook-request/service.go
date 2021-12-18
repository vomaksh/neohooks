package webhook_request

import (
	"context"
	"fmt"
	"github.com/go-redis/redis/v8"
	"github.com/iyorozuya/webhooks/api/structs"
	"net/url"
)

type WebhookRequestService struct {
	DB *redis.Client
}

var ctx context.Context = context.Background()

func (wrs *WebhookRequestService) Retrieve(id string) (structs.WebhookRequest, error) {
	wr, err := wrs.DB.HGetAll(ctx, fmt.Sprintf("webhook:request:%s", id)).Result()
	if err != nil {
		return structs.WebhookRequest{}, err
	}
	url, err := url.Parse(wr["url"])
	if err != nil {
		return structs.WebhookRequest{}, err
	}
	urlQueryStrings := url.Query()
	wrHeaders, err := wrs.DB.HGetAll(ctx, fmt.Sprintf("webhook:request:%s:headers", id)).Result()
	if err != nil {
		return structs.WebhookRequest{}, err
	}
	if err != nil {
		return structs.WebhookRequest{}, err
	}
	return structs.WebhookRequest{
		ID:           wr["id"],
		URL:          wr["url"],
		Method:       wr["method"],
		Host:         wr["host"],
		Size:         wr["size"],
		CreatedAt:    wr["createdAt"],
		Headers:      wrHeaders,
		QueryStrings: urlQueryStrings,
	}, nil
}

func (wrs *WebhookRequestService) Save(webhookId string, webhookRequest structs.WebhookRequest) {
	wrs.DB.HSet(ctx, fmt.Sprintf("webhook:request:%s", webhookRequest.ID), map[string]string{
		"id":        webhookRequest.ID,
		"url":       webhookRequest.URL,
		"method":    webhookRequest.Method,
		"host":      webhookRequest.Host,
		"size":      webhookRequest.Size,
		"createdAt": webhookRequest.CreatedAt,
	})
	wrs.DB.HSet(
		ctx,
		fmt.Sprintf("webhook:request:%s:headers", webhookRequest.ID),
		webhookRequest.Headers,
	)
}

func (wrs *WebhookRequestService) Remove(id string) string {
	wrs.DB.HDel(ctx, fmt.Sprintf("webhook:request:%s", id))
	wrs.DB.HDel(ctx, fmt.Sprintf("webhook:request:%s:headers", id))
	return id
}
