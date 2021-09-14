import { RootState } from '../store';
import { IApp } from '../types';
import { createSelector } from '@reduxjs/toolkit';

const selectApp = (state: RootState): IApp => state.app;

const selectConnectionStatus = createSelector(
  selectApp,
  (app) => app.isConnected
);

const selectInfoMessages = createSelector(selectApp, (app) => app.infoMessages);

export const appSelectors = {
  selectApp,
  selectConnectionStatus,
  selectInfoMessages,
};
