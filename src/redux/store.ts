import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { rootReducer } from './slices';
import { gameSettingsActions } from './slices/game-settings/game-settings-slice';

export const store = configureStore({
  reducer: rootReducer,
});

store.dispatch(
  gameSettingsActions.changeSettings({ timer: { minutes: 0, seconds: 5 } })
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
