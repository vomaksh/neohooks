package structs

type WebhookRequest struct {
	ID           string            `json:"string"`
	Method       string            `json:"method"`
	Host         string            `json:"host"`
	Size         string            `json:"string"`
	CreatedAt    string            `json:"createdAt"`
	Headers      map[string]string `json:"headers"`
	QueryStrings map[string]string `json:"queryStrings"`
}
