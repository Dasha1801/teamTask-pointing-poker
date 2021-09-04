import { immerable } from 'immer';
import { TCardScore } from './card';
import { IUser } from './user';
import { IIssue } from './issue';
import { IGameSettings, GameSettings } from './game-settings';
import { IMessage } from './message';

export enum TGameStatus {
  lobby = 'lobby',
  started = 'started',
  roundInProgress = 'roundInProgress',
  inactive = 'inactive',
}

export type TRoundResults = Record<string, TCardScore>;

export interface IGame {
  [immerable]: boolean;
  id: string;
  dealerId: string;
  userId: string;
  currentIssueId: string;
  status: TGameStatus;
  players: IUser[];
  issues: IIssue[];
  messages: IMessage[];
  settings: IGameSettings;
  currentRoundResults: TRoundResults;
}

export class Game implements IGame {
  [immerable] = true;
  id = '';
  dealerId = '';
  userId = '';
  currentIssueId = '';
  status = TGameStatus.lobby;
  players: IUser[] = [];
  issues: IIssue[] = [];
  messages: IMessage[] = [];
  settings = new GameSettings();
  currentRoundResults: TRoundResults = {};

  constructor(gameParameters?: Partial<IGame>) {
    Object.assign(this, gameParameters);
  }
}
