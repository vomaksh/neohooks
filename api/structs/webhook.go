package structs

// ListWebhooksResponse List of webhooks response
type ListWebhooksResponse struct {
	Webhooks []string `json:"webhooks"`
}

// CreateWebhookResponse Create new webhook response
type CreateWebhookResponse struct {
	ID string `json:"id"`
}

// RetrieveWebhookResponse Retrieve existing webhook response
type RetrieveWebhookResponse struct {
	ID       string               `json:"id"`
	Requests []WebhookRequestList `json:"requests"`
}

// RemoveWebhookResponse Remove existing webhook
type RemoveWebhookResponse struct {
	ID string `json:"id"`
}
