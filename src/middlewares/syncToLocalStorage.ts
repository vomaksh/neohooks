import { Middleware } from '@reduxjs/toolkit';

export const syncToLocalStorage: Middleware = (store) => (next) => (action) => {
  const { webhooks } = store.getState();
  localStorage.setItem('webhooks', JSON.stringify(webhooks));
  return next(action);
};
