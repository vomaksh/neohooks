import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Webhook, WebhookRequest} from "../types";

export const webhookAPI = createApi({
  reducerPath: 'webhook',
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
  }),
  tagTypes: ["webhook"],
  endpoints: (build) => ({
    createWebhook: build.mutation<Webhook, void>({
      query: () => ({ url: `webhook`, method: 'POST' }),
    }),
    findOrCreateWebhook: build.mutation<Webhook, string>({
      query: (id: string) => ({ url: `webhook/${id}`, method: 'POST' }),
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
})