package structs

import "net/url"

type WebhookRequest struct {
	ID           string            `json:"id"`
	URL          string            `json:"url"`
	Method       string            `json:"method"`
	Host         string            `json:"host"`
	Size         string            `json:"string"`
	CreatedAt    string            `json:"createdAt"`
	Headers      map[string]string `json:"headers"`
	QueryStrings url.Values        `json:"queryStrings"`
}
