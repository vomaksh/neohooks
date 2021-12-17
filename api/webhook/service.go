package webhook

import (
	"context"
	"github.com/go-redis/redis/v8"
	"github.com/google/uuid"
)

type WebhookService struct {
	DB *redis.Client
}

var ctx context.Context = context.Background()

func (ws *WebhookService) List() ([]string, error) {
	webhooks, err := ws.DB.Get(ctx, "webhook").Result()
	switch {
	case err == redis.Nil:
		return []string{}, nil
	case err != nil:
		return []string{}, err
	case webhooks == "":
		return []string{}, nil
	}
	return []string{webhooks}, nil
}

func (ws *WebhookService) Retrieve() {

}

func (ws *WebhookService) Save() string {
	webhookId := uuid.Must(uuid.NewRandom()).String()
	ws.DB.HSet(ctx, "webhooks", map[string]bool{
		webhookId: true,
	})
	return webhookId
}

func (ws *WebhookService) Remove(id string) string {
	ws.DB.HDel(ctx, "webhooks", id)
	return id
}
