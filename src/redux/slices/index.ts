import { appSlice } from './app/app-slice';
import { currentUserSlice } from './currentUser/current-user-slice';
import { gameSettingsSlice } from './game-settings/game-settings-slice';
import { gameSlice } from './game/game-slice';
import { lobbyPageSlice } from './lobby-page/lobby-page';

export const rootReducer = {
  game: gameSlice.reducer,
  app: appSlice.reducer,
  currentUser: currentUserSlice.reducer,
  gameSettings: gameSettingsSlice.reducer,
  lobbyPage: lobbyPageSlice.reducer,
};
