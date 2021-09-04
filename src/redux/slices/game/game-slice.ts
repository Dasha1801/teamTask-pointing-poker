import { createSlice } from '@reduxjs/toolkit';
import { gameReducers } from '../../reducers';
import { Game } from '../../types';

const initialState = new Game();

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: gameReducers,
});

export const gameActions = gameSlice.actions;
