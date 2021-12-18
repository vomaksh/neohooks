package controllers

import (
	"encoding/json"
	"fmt"
	"github.com/go-chi/chi/v5"
	"github.com/iyorozuya/webhooks/api/structs"
	webhook_request "github.com/iyorozuya/webhooks/api/webhook-request"
	"net/http"
	"strings"
)

type WebhookController struct {
	WebhookRequestService webhook_request.WebhookRequestService
}

func (wc *WebhookController) Routes() []structs.Route {
	return []structs.Route{
		structs.Route{
			Method:  http.MethodGet,
			Path:    fmt.Sprintf("/{id}"),
			Handler: wc.webhookHandlerFunc,
		},
		structs.Route{
			Method:  http.MethodPost,
			Path:    fmt.Sprintf("/{id}"),
			Handler: wc.webhookHandlerFunc,
		},
	}
}

func (wc *WebhookController) webhookHandlerFunc(w http.ResponseWriter, r *http.Request) {
	webhookId := chi.URLParam(r, "id")
	headers := make(map[string]string)
	// Get webhook-request headers
	for header, values := range r.Header {
		headers[header] = strings.Join(values, ", ")
	}
	// Get response headers
	for header, values := range w.Header() {
		headers[header] = strings.Join(values, ", ")
	}
	wc.WebhookRequestService.Save(webhookId, structs.WebhookRequest{
		ID:           headers["X-Request-Id"],
		URL:          r.RequestURI,
		Method:       r.Method,
		Host:         headers["X-Requested-By"],
		Size:         string(r.ContentLength),
		Headers:      headers,
		QueryStrings: r.URL.Query(),
		CreatedAt:    headers["X-Request-Time"],
	})
	json.NewEncoder(w).Encode(map[string]interface{}{
		"headers": headers,
	})
}
