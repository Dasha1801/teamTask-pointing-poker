import { createSlice } from '@reduxjs/toolkit';
import { appReducers } from '../../reducers';
import { connectAsync } from '../../thunks';

const initialState = { isConnected: false };

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: appReducers,
  extraReducers: (builder) => {
    builder.addCase(connectAsync.fulfilled, (state, action) => {
      state.isConnected = action.payload;
    });
  },
});

export const appActions = appSlice.actions;
