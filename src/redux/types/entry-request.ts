import { IUser } from '.';

export interface IEntryRequest {
  isEntryRequested: boolean;
  playerInfo: Partial<IUser>;
}
