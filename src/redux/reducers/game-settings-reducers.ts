import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { GameSettings, IGameSettings } from '../types';

const changeSettings: CaseReducer<
  IGameSettings,
  PayloadAction<IGameSettings>
> = (state, action) => {
  Object.assign(state, action.payload);
};

const resetSettings: CaseReducer = (state) => {
  Object.assign(state, new GameSettings().toObject());
};

export const gameSettingsReducers = {
  changeSettings,
  resetSettings,
};
