import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { webhooksActions } from '../features/webhooks/webhooks';
import { Webhook, WebhookRequest } from '../types';

export const webhookAPI = createApi({
  reducerPath: 'webhook',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/',
  }),
  tagTypes: ['Webhook', 'WebhookRequest'],
  endpoints: (build) => ({
    getWebhooks: build.query<string[], void>({
      queryFn: (_, { getState }) => {
        const { webhooks } = getState() as { webhooks: string[] };
        return { data: webhooks };
      },
      providesTags: ['Webhook'],
    }),
    createWebhook: build.mutation<Webhook, void>({
      queryFn: async (_, api, _extraOptions, fetchWithBQ) => {
        const createWebhookResult = await fetchWithBQ({
          url: `webhook`,
          method: 'POST',
        });
        if (createWebhookResult.error) throw createWebhookResult.error;
        const webhook = createWebhookResult.data as Webhook;
        api.dispatch(webhooksActions.add(webhook.id));
        if (createWebhookResult.data) {
          return {
            data: webhook,
          };
        }
        return {
          error: createWebhookResult as FetchBaseQueryError,
        };
      },
      invalidatesTags: ['Webhook'],
    }),
    findWebhook: build.query<Webhook, string>({
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

export const { useCreateWebhookMutation, useGetWebhooksQuery, useFindWebhookQuery } = webhookAPI;
