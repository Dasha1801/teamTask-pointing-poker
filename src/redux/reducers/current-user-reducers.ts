import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../types';

const changeCurrentUser: CaseReducer<IUser, PayloadAction<Partial<IUser>>> = (
  state,
  action
) => {
  Object.assign(state, action.payload);
};

export const currentUserReducers = {
  changeCurrentUser,
};
