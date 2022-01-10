/* Webhook Request Core Information */
export interface WebhookRequestCoreInfo {
  id: string;
  createdAt: string;
  method: string;
}

/* Webhook */
export interface Webhook {
  id: string;
  requests?: WebhookRequestCoreInfo[];
}

export interface WebhookWithDetails {
  id: string;
  requests: WebhookRequestCoreInfo[];
  page: number;
  total: number;
  rows: number;
}

/* Webhook Request List */
export interface WebhookRequestList extends WebhookRequestCoreInfo {
  isActive: boolean;
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
  queryStrings: Record<string, string>;
  body: string;
}

/* Request info tabs */
export enum RequestInfoTab {
  DETAILS = 'details',
  HEADERS = 'headers',
  QUERY_STRINGS = 'querystring',
  BODY = 'body',
}

/* Pagination */
export interface Pagination {
  page: number;
  total: number;
  rows: number;
}
