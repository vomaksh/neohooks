package request

import (
	"context"
	"fmt"
	"github.com/go-redis/redis/v8"
	"github.com/iyorozuya/webhooks/api/structs"
)

type WebhookRequestService struct {
	DB *redis.Client
}

var ctx context.Context = context.Background()

func (wrs *WebhookRequestService) Retrieve(id string) (structs.WebhookRequest, error) {
	wr, err := wrs.DB.HGetAll(ctx, fmt.Sprintf("request:%s", id)).Result()
	if err != nil {
		return structs.WebhookRequest{}, err
	}
	wrHeaders, err := wrs.DB.HGetAll(ctx, fmt.Sprintf("request:%s:headers", id)).Result()
	if err != nil {
		return structs.WebhookRequest{}, err
	}
	wrQueryStrings, err := wrs.DB.HGetAll(ctx, fmt.Sprintf("request:%s:queryStrings", id)).Result()
	if err != nil {
		return structs.WebhookRequest{}, err
	}
	return structs.WebhookRequest{
		ID:           wr["id"],
		Method:       wr["method"],
		Host:         wr["host"],
		Size:         wr["size"],
		CreatedAt:    wr["createdAt"],
		Headers:      wrHeaders,
		QueryStrings: wrQueryStrings,
	}, nil
}

func (wrs *WebhookRequestService) Save(webhookId string) {
}

func (wrs *WebhookRequestService) Remove(id string) string {
	wrs.DB.HDel(ctx, fmt.Sprintf("request:%s", id))
	wrs.DB.HDel(ctx, fmt.Sprintf("request:%s:headers", id))
	wrs.DB.HDel(ctx, fmt.Sprintf("request:%s:queryStrings", id))
	return id
}
