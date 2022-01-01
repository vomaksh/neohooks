import { configureStore } from '@reduxjs/toolkit';
import { webhookAPI } from './services/webhook';

export const store = configureStore({
  reducer: {
    [webhookAPI.reducerPath]: webhookAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(webhookAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
