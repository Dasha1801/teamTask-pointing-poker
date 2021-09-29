import { createSlice } from '@reduxjs/toolkit';
import { entryRequestReducers } from '../../reducers';
import { User } from '../../types';
import { IEntryRequest } from '../../types/entry-request';

const initialEntryRequestState: IEntryRequest = {
  isEntryRequested: false,
  playerInfo: new User().toObject(),
};

export const entryRequestSlice = createSlice({
  name: 'entryRequest',
  initialState: { ...initialEntryRequestState },
  reducers: entryRequestReducers,
});

export const entryRequestActions = entryRequestSlice.actions;
