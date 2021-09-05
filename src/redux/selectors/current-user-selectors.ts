import { RootState } from '../store';
import { IUser } from '../types';

const selectCurrentUser = (state: RootState): IUser => state.currentUser;

export const currentUserSelectors = {
  selectCurrentUser,
};
