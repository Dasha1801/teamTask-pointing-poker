import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { ISideBar } from '../types/side-bar';

const changeShowSideBar: CaseReducer<ISideBar, PayloadAction<boolean>> = (
  state,
  action
) => {
  state.isShowSideBar = action.payload;
};

export const sideBarReducers = {
  changeShowSideBar,
};
