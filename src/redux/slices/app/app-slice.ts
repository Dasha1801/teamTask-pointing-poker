import { createSlice } from '@reduxjs/toolkit';
import { appReducers } from '../../reducers';

const initialAppState = { isConnected: false };

export const appSlice = createSlice({
  name: 'app',
  initialState: { ...initialAppState },
  reducers: appReducers,
});

export const appActions = appSlice.actions;
