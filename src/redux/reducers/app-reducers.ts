import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { IApp } from '../types';

const changeConnectionStatus: CaseReducer<IApp, PayloadAction<boolean>> = (
  state,
  action
) => {
  state.isConnected = action.payload;
};

export const appReducers = {
  changeConnectionStatus,
};
