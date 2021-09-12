import { createSlice } from '@reduxjs/toolkit';
import { sideBarReducers } from '../../reducers/side-bar-reducers';

const initialSideBarState = { isShowSideBar: false };

export const sideBarSlice = createSlice({
  name: 'sideBar',
  initialState: { ...initialSideBarState },
  reducers: sideBarReducers,
});

export const sideBarActions = sideBarSlice.actions;
