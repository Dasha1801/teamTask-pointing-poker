import { RootState } from '../store';
import { IApp } from '../types';
import { createSelector } from '@reduxjs/toolkit';

const selectApp = (state: RootState): IApp => state.app;

const selectConnectionStatus = createSelector(
  selectApp,
  (app) => app.isConnected
);

export const appSelectors = {
  selectApp,
  selectConnectionStatus,
};
