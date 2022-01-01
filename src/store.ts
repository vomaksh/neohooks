import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { webhooksSlice } from './features/webhooks/webhooksSlice';
import { syncToLocalStorage } from './middlewares/syncToLocalStorage';
import { webhookAPI } from './services/webhook';

export const store = configureStore({
  reducer: {
    [webhookAPI.reducerPath]: webhookAPI.reducer,
    [webhooksSlice.name]: webhooksSlice.reducer,
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
  let webhooks = localStorage.getItem('webhooks');
  if (!webhooks) {
    return { webhooks: [] };
  }
  try {
    webhooks = JSON.parse(webhooks);
    if (!Array.isArray(webhooks)) {
      return { webhooks: [] };
    }
    return { webhooks };
  } catch (error) {
    return { webhooks: [] };
  }
}
