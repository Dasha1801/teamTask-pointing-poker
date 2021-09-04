import { RootState } from './store';
import { createSelector } from '@reduxjs/toolkit';
import { IGame } from './types';
import { IApp } from './types/app';

const selectGame = (state: RootState): IGame => state.game;

const selectId = createSelector(selectGame, (game) => game.id);

const selectDealerId = createSelector(selectGame, (game) => game.dealerId);

const selectUserId = createSelector(selectGame, (game) => game.userId);

const selectPlayers = createSelector(selectGame, (game) => game.players);

const selectIssues = createSelector(selectGame, (game) => game.issues);

const selectSettings = createSelector(selectGame, (game) => game.players);

const selectCurrentIssueId = createSelector(
  selectGame,
  (game) => game.currentIssueId
);

const selectCurrentRoundResults = createSelector(
  selectGame,
  (game) => game.players
);

export const gameSelectors = {
  selectGame,
  selectId,
  selectDealerId,
  selectUserId,
  selectPlayers,
  selectIssues,
  selectSettings,
  selectCurrentIssueId,
  selectCurrentRoundResults,
};

const selectApp = (state: RootState): IApp => state.app;

const selectConnectionStatus = createSelector(
  selectApp,
  (app) => app.isConnected
);

export const appSelectors = {
  selectApp,
  selectConnectionStatus,
};
