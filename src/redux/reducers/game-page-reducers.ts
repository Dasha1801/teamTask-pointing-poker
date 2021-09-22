import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { ITimer } from '../types';
import { IGamePage } from '../types/game-page';

const changeTimer: CaseReducer<IGamePage, PayloadAction<ITimer>> = (
  state,
  action
) => {
  state.timer = action.payload;
};

export const gamePageReducers = {
  changeTimer,
};
