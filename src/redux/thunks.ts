import { createAsyncThunk } from '@reduxjs/toolkit';

export const connectAsync = createAsyncThunk<boolean>(
  'app/connect',
  async () => {
    const connectionStatus: boolean = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      });
    });
    return connectionStatus;
  }
);
