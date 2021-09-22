import { RootState } from '../store';
import { createSelector } from '@reduxjs/toolkit';
import { ILobbyPage } from '../types/lobby-page';

const selectLobbyPage = (state: RootState): ILobbyPage => state.lobbyPage;

const selectIsSideBarShown = createSelector(
  selectLobbyPage,
  (lobbyPage) => lobbyPage.isSideBarShown
);
const selectWasKicked = createSelector(
  selectLobbyPage,
  (lobbyPage) => lobbyPage.wasKicked
);

const selectGameCancelled = createSelector(
  selectLobbyPage,
  (lobbyPage) => lobbyPage.gameCancelled
);

const selectIsVotingInProgress = createSelector(
  selectLobbyPage,
  (lobbyPage) => lobbyPage.isVotingInProgress
);

export const lobbyPageSelectors = {
  selectIsSideBarShown,
  selectWasKicked,
  selectGameCancelled,
  selectIsVotingInProgress,
};
