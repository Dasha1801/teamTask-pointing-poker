import { createAction } from '@reduxjs/toolkit';
import { appSlice, appActions } from './app-slice';
import { IApp } from '../../types/app';

describe('app slice', () => {
  const initialState: IApp = { isConnected: false };

  test('should handle initial state', () => {
    expect(appSlice.reducer(undefined, createAction(''))).toEqual({
      ...initialState,
    });
  });

  test('should handle changeConnectionStatus', () => {
    expect(
      appSlice.reducer(undefined, appActions.changeConnectionStatus(true))
    ).toEqual({
      ...initialState,
      isConnected: true,
    });
  });

  test('should handle connectAsync', () => {
    expect(
      appSlice.reducer(undefined, appActions.changeConnectionStatus(true))
    ).toEqual({
      ...initialState,
      isConnected: true,
    });
  });
});
