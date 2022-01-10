package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/iyorozuya/neohooks/api/services"
	"github.com/iyorozuya/neohooks/api/structs"
)

type WebhookRequestController struct {
	WebhookRequestService services.WebhookRequestService
}

// Routes List of routes supported by webhook controller
func (wrc *WebhookRequestController) Routes() []structs.Route {
	var baseURL string = "/api/webhook-request"
	return []structs.Route{
		{
			Method:  http.MethodGet,
			Path:    fmt.Sprintf("%s/{id}", baseURL),
			Handler: wrc.retrieve,
		},
		{
			Method:  http.MethodDelete,
			Path:    fmt.Sprintf("%s/{id}", baseURL),
			Handler: wrc.remove,
		},
	}
}

// retrieve webhook request - GET /webhook-request/{id}
func (wrc *WebhookRequestController) retrieve(w http.ResponseWriter, r *http.Request) {
	webhookRequestId := chi.URLParam(r, "id")
	webhookRequest, err := wrc.WebhookRequestService.Retrieve(webhookRequestId)
	if err != nil {
		w.WriteHeader(400)
		json.NewEncoder(w).Encode(map[string]string{
			"error": err.Error(),
		})
	}
	json.NewEncoder(w).Encode(webhookRequest)
}

// remove webhook request - DELETE /webhook-request/{id}
func (wrc *WebhookRequestController) remove(w http.ResponseWriter, r *http.Request) {
	webhookRequestId := chi.URLParam(r, "id")
	webhookRequest := wrc.WebhookRequestService.Remove(webhookRequestId)
	json.NewEncoder(w).Encode(map[string]string{
		"id": webhookRequest,
	})
}
