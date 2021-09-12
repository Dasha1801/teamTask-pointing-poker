import { appSlice } from './app/app-slice';
import { gameSlice } from './game/game-slice';
import { currentUserSlice } from './currentUser/current-user-slice';
import { gameSettingsSlice } from './game-settings/game-settings-slice';
import { sideBarSlice } from './side-bar/side-bar';

export const rootReducer = {
  game: gameSlice.reducer,
  app: appSlice.reducer,
  currentUser: currentUserSlice.reducer,
  gameSettings: gameSettingsSlice.reducer,
  sideBar: sideBarSlice.reducer
};
