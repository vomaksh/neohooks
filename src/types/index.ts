/* Webhook */
export interface Webhook {
  id: string;
  requests?: string[]; /* requests are only received during GET request */
}

/* Webhook Request */
export interface WebhookRequest {
  id: string;
  url: string;
  method: string;
  host: string;
  size: string;
  createdAt: string;
  headers: Record<string, string>;
  queryStrings: any;
  body: string;
}