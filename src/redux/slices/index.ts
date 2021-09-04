import { appSlice } from './app/app-slice';
import { gameSlice } from './game/game-slice';

export const rootReducer = {
  game: gameSlice.reducer,
  app: appSlice.reducer,
};
