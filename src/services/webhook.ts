import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Webhook, WebhookRequest } from '../types';

export const webhookAPI = createApi({
  reducerPath: 'webhook',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/',
  }),
  tagTypes: ['webhook'],
  endpoints: (build) => ({
    getWebhooks: build.query<string[], void>({
      queryFn: (_, { getState }) => {
        const { webhooks } = getState() as { webhooks: string[] };
        return { data: webhooks };
      },
    }),
    createWebhook: build.mutation<Webhook, void>({
      query: () => ({ url: `webhook`, method: 'POST' }),
    }),
    findOrCreateWebhook: build.query<Webhook, string>({
      query: (id: string) => ({ url: `webhook/${id}`, method: 'GET' }),
    }),
    getWebhook: build.query<Webhook, string>({
      query: (id: string) => ({ url: `webhook/${id}` }),
    }),
    deleteWebhook: build.mutation<Webhook, string>({
      query: (id: string) => ({ url: `webhook/${id}`, method: 'DELETE' }),
    }),
    findRequest: build.query<WebhookRequest, string>({
      query: (id: string) => ({ url: `webhook-request/${id}` }),
    }),
  }),
});

export const { useCreateWebhookMutation, useGetWebhooksQuery } = webhookAPI;
