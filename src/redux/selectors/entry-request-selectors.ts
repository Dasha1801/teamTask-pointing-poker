import { RootState } from '../store';
import { IUser } from '../types';
import { IEntryRequest } from '../types/entry-request';

const selectRequest = (state: RootState): IEntryRequest => state.entryRequest;

const selectEntryRequested = (state: RootState): boolean =>
  state.entryRequest.isEntryRequested;

const selectPlayerInfo = (state: RootState): Partial<IUser> =>
  state.entryRequest.playerInfo;

export const entryRequestSelectors = {
  selectRequest,
  selectEntryRequested,
  selectPlayerInfo,
};
