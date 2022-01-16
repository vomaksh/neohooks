package services

import (
	"encoding/json"
	"fmt"
	"net/url"
	"time"

	redis "github.com/go-redis/redis/v8"
	"github.com/iyorozuya/neohooks/api/structs"
)

type WebhookRequestService struct {
	DB *redis.Client
}

func (wrs *WebhookRequestService) Retrieve(id string) (*structs.WebhookRequest, error) {
	wr, err := wrs.DB.HGetAll(ctx, fmt.Sprintf("webhook:request:%s", id)).Result()
	if err != nil {
		return nil, err
	}
	url, err := url.Parse(wr["url"])
	if err != nil {
		return nil, err
	}
	urlQueryStrings := url.Query()
	wrHeaders, err := wrs.DB.HGetAll(ctx, fmt.Sprintf("webhook:request:%s:headers", id)).Result()
	if err != nil {
		return nil, err
	}
	if err != nil {
		return nil, err
	}
	return &structs.WebhookRequest{
		ID:           wr["id"],
		URL:          wr["url"],
		Method:       wr["method"],
		Host:         wr["host"],
		Size:         wr["size"],
		CreatedAt:    wr["createdAt"],
		Headers:      wrHeaders,
		QueryStrings: urlQueryStrings,
		Body:         wr["body"],
	}, nil
}

func (wrs *WebhookRequestService) retrieveByIDs(ids []string) (*[]structs.WebhookRequestList, error) {
	webhookRequests := make([]structs.WebhookRequestList, 0)
	for _, id := range ids {
		webhookRequestDetails, err := wrs.DB.HMGet(ctx, fmt.Sprintf("webhook:request:%s", id), "id", "method", "createdAt").Result()
		if err != nil {
			return nil, err
		}
		webhookRequests = append(webhookRequests, structs.WebhookRequestList{
			ID:        fmt.Sprintf("%v", webhookRequestDetails[0]),
			Method:    fmt.Sprintf("%v", webhookRequestDetails[1]),
			CreatedAt: fmt.Sprintf("%v", webhookRequestDetails[2]),
		})
	}
	return &webhookRequests, nil
}

func (wrs *WebhookRequestService) Save(webhookId string, webhookRequest structs.WebhookRequest) {
	webhookRequestTime, _ := time.Parse(time.RFC3339, webhookRequest.CreatedAt)
	wrs.DB.ZAdd(ctx, fmt.Sprintf("webhook:%s:requests", webhookId), &redis.Z{
		Score:  float64(webhookRequestTime.Unix()),
		Member: webhookRequest.ID,
	})
	wrs.DB.HSet(ctx, fmt.Sprintf("webhook:request:%s", webhookRequest.ID), map[string]string{
		"id":        webhookRequest.ID,
		"url":       webhookRequest.URL,
		"method":    webhookRequest.Method,
		"host":      webhookRequest.Host,
		"size":      webhookRequest.Size,
		"body":      webhookRequest.Body,
		"createdAt": webhookRequest.CreatedAt,
	})
	wrs.DB.HSet(
		ctx,
		fmt.Sprintf("webhook:request:%s:headers", webhookRequest.ID),
		webhookRequest.Headers,
	)
	webhookRequestJSON, _ := json.Marshal(structs.WebhookRequestList{
		ID:        webhookRequest.ID,
		Method:    webhookRequest.Method,
		CreatedAt: webhookRequest.CreatedAt,
	})
	wrs.DB.Publish(ctx, fmt.Sprintf("webhook:%s:requests", webhookId), webhookRequestJSON)
}

func (wrs *WebhookRequestService) Remove(id string) string {
	wrs.DB.HDel(ctx, fmt.Sprintf("webhook:request:%s", id))
	wrs.DB.HDel(ctx, fmt.Sprintf("webhook:request:%s:headers", id))
	return id
}
