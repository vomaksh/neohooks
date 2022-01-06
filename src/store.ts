import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { webhooksSlice } from './features/webhooks';
import { webhookRequestSlice } from './features/webhookRequest';
import { syncToLocalStorage } from './middlewares/syncToLocalStorage';
import { webhookAPI } from './services/webhook';

export const store = configureStore({
  reducer: {
    [webhookAPI.reducerPath]: webhookAPI.reducer,
    [webhooksSlice.name]: webhooksSlice.reducer,
    [webhookRequestSlice.name]: webhookRequestSlice.reducer,
  },
  devTools: true,
  preloadedState: preloadState(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger).concat(webhookAPI.middleware).concat(syncToLocalStorage),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/*
  Load webhooks from localstorage
  and sync to webhooks slice
*/
function preloadState() {
  const webhooks: string | null = localStorage.getItem('webhooks');
  if (!webhooks) {
    return { webhooks: [] };
  }
  try {
    const webhooksParsed: string[] = JSON.parse(webhooks) as string[];
    if (!Array.isArray(webhooksParsed)) {
      return { webhooks: [] };
    }
    return { webhooks: webhooksParsed };
  } catch (error) {
    return { webhooks: [] };
  }
}
