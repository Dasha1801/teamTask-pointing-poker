import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
import { IUser, User } from '../types';
import { IEntryRequest } from '../types/entry-request';

const changeIsEntryRequested: CaseReducer<
  IEntryRequest,
  PayloadAction<boolean>
> = (state) => {
  state.isEntryRequested = !state.isEntryRequested;
};

const changePlayerInfo: CaseReducer<
  IEntryRequest,
  PayloadAction<Partial<IUser>>
> = (state, action) => {
  Object.assign(state.playerInfo, action.payload);
};

const resetEntryRequest: CaseReducer<IEntryRequest, AnyAction> = (state) => {
  state.isEntryRequested = false;
  state.playerInfo = new User().toObject();
};

export const entryRequestReducers = {
  changeIsEntryRequested,
  changePlayerInfo,
  resetEntryRequest,
};
