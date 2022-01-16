import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { webhooksActions } from '../features/webhooks';
import { Webhook, WebhookRequest, WebhookRequestCoreInfo, WebhookWithDetails } from '../types';
import { webhookRequestActions } from '../features/webhookRequest';

export const webhookAPI = createApi({
  reducerPath: 'webhook',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
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
    findWebhook: build.query<WebhookWithDetails, { webhookId: string }>({
      queryFn: async (params, api, _extraOptions, fetchWithBQ) => {
        const findWebhookResult = await fetchWithBQ({
          url: `webhook/${params.webhookId}`,
          method: 'GET',
        });
        if (findWebhookResult.error) throw findWebhookResult.error;
        const webhook = findWebhookResult.data as WebhookWithDetails;
        if (webhook.requests && webhook.requests.length > 0) {
          const firstWebhookRequest = webhook.requests[0];
          api.dispatch(webhookRequestActions.set(firstWebhookRequest.id));
        }
        if (findWebhookResult.data) {
          return {
            data: webhook,
          };
        }
        return {
          error: findWebhookResult as FetchBaseQueryError,
        };
      },
      onCacheEntryAdded: async (params, api) => {
        // Connecting to websocket for getting requests
        const ws = new WebSocket(`wss://localhost:8443/api/ws/webhook/${params.webhookId}`);
        await api.cacheDataLoaded;
        ws.addEventListener('message', (event: MessageEvent<string>) => {
          try {
            const webhookRequest = JSON.parse(event.data) as WebhookRequestCoreInfo;
            api.updateCachedData((draft) => {
              draft.requests.unshift(webhookRequest);
              // eslint-disable-next-line no-param-reassign
              draft.total += 1;
            });
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
          }
        });
        // Cleanup
        await api.cacheEntryRemoved;
        ws.close();
      },
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

export const {
  useCreateWebhookMutation,
  useGetWebhooksQuery,
  useFindWebhookQuery,
  useFindRequestQuery,
} = webhookAPI;
