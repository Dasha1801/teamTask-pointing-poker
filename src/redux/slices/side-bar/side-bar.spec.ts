import { createAction } from '@reduxjs/toolkit';
import { sideBarSlice, sideBarActions } from './side-bar';
import { ISideBar } from '../../types/side-bar';

describe('side-bar slice', () => {
  const initialState: ISideBar = { isShowSideBar: false };

  test('should handle initial state', () => {
    expect(sideBarSlice.reducer(undefined, createAction(''))).toEqual({
      ...initialState,
    });
  });

  test('should handle changeConnectionStatus', () => {
    expect(
      sideBarSlice.reducer(undefined, sideBarActions.changeShowMessage(true))
    ).toEqual({
      ...initialState,
      isShowSideBar: true,
    });
  });
});
