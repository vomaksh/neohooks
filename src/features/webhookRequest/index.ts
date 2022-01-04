import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: string = '';

export const webhookRequestSlice = createSlice({
  name: 'webhookRequest',
  initialState,
  reducers: {
    set(_state, action: PayloadAction<string>): string {
      return action.payload;
    },
    reset() {
      return initialState;
    },
  },
});

export const { actions: webhookRequestActions } = webhookRequestSlice;
