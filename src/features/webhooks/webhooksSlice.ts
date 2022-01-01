import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: string[] = [];

export const webhooksSlice = createSlice({
  name: 'webhooks',
  initialState,
  reducers: {
    add: (state: string[], action: PayloadAction<string>) => {
      state.push(action.payload);
    },
    sync: (state: string[], action: PayloadAction<string[]>) => {
      state.push(...action.payload);
    },
  },
});

export const { actions: webhooksActions } = webhooksSlice;
