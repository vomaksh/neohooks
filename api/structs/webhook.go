package structs

// ListWebhooksResponse List of webhooks response
type ListWebhooksResponse struct {
	Webhooks []string `json:"webhooks"`
}

// CreateWebhookResponse Create new webhook response
type CreateWebhookResponse struct {
	ID string `json:"id"`
}

// RemoveWebhookResponse Remove existing webhook
type RemoveWebhookResponse struct {
	ID string `json:"id"`
}
