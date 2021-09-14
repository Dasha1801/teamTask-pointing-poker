import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { ILobbyPage } from '../types/lobby-page';

const toggleSideBar: CaseReducer<ILobbyPage, PayloadAction<void>> = (state) => {
  state.isSideBarShown = !state.isSideBarShown;
};

export const lobbyPageReducers = {
  toggleSideBar,
};
