import { RootState } from '../store';
import { createSelector } from '@reduxjs/toolkit';
import { ISideBar } from '../types/side-bar';

const selectSideBar = (state: RootState): ISideBar => state.sideBar;

const selectShowMessage = createSelector(
  selectSideBar,
  (sideBar) => sideBar.isShowSideBar
);

export const sideBarSelectors = {
  selectSideBar,
  selectShowMessage,
};
