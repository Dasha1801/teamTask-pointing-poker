import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { mockIssues, mockMessages, mockUsers } from '../shared/mocks';
import { rootReducer } from './slices';
import { gameSettingsActions } from './slices/game-settings/game-settings-slice';
import { gameActions } from './slices/game/game-slice';
import { TGameStatus } from './types';

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

store.dispatch(gameActions.changePlayers(mockUsers));
store.dispatch(gameActions.changeMessages(mockMessages));
store.dispatch(gameActions.changeIssues(mockIssues));
store.dispatch(
  gameSettingsActions.changeSettings({ timer: { minutes: 2, seconds: 30 } })
);
store.dispatch(gameActions.changeStatus(TGameStatus.lobby));
