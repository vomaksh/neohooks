package controllers

import (
	"encoding/json"
	"fmt"
	"github.com/go-chi/chi/v5"
	"github.com/go-redis/redis/v8"
	"github.com/iyorozuya/webhooks/api/structs"
	"github.com/iyorozuya/webhooks/api/webhook"
	"net/http"
)

var baseURL string = "/webhook"

type WebhookController struct {
	DB      *redis.Client
	Service webhook.WebhookService
}

// Routes List of routes supported by webhook controller
func (wc *WebhookController) Routes() []structs.Route {
	return []structs.Route{
		structs.Route{
			Method:  http.MethodGet,
			Path:    fmt.Sprintf("%s", baseURL),
			Handler: wc.list,
		},
		structs.Route{
			Method:  http.MethodPost,
			Path:    fmt.Sprintf("%s", baseURL),
			Handler: wc.create,
		},
	}
}

// GET /webhook - List all webhooks
func (wc *WebhookController) list(w http.ResponseWriter, r *http.Request) {
	webhooks, err := wc.Service.List()
	if err != nil {
		w.WriteHeader(422)
		json.NewEncoder(w).Encode(
			structs.ErrorResponse{
				Errors: []string{"Unable to fetch webhooks"},
			})
		return
	}
	json.NewEncoder(w).Encode(structs.ListWebhooksResponse{
		Webhooks: webhooks,
	})
}

// POST /webhook - Create new webhook
func (wc *WebhookController) create(w http.ResponseWriter, r *http.Request) {
	webhook := wc.Service.Save()
	json.NewEncoder(w).Encode(structs.CreateWebhookResponse{
		ID: webhook,
	})
}

// GET /webhook/:id - Get webhook by id
func (wc *WebhookController) retrieve(w http.ResponseWriter, r *http.Request) {

}

// DELETE /webhook/:id - Remove existing webhook
func (wc *WebhookController) remove(w http.ResponseWriter, r *http.Request) {
	webhookId := chi.URLParam(r, "id")
	webhook := wc.Service.Remove(webhookId)
	json.NewEncoder(w).Encode(structs.RemoveWebhookResponse{
		ID: webhook,
	})
}
