import { IUser } from './user';
import { IMessage } from './message';
import { IIssue } from './issue';
import { IGameSettings } from './game-settings';
import { TCardScore } from './card';

export interface IThunkAddPlayerResult {
  gameId: string;
  dealer: IUser;
  player: IUser;
}

export interface IThunkCreateGameResult {
  dealer: IUser;
}

export interface IThunkPostMessageResult {
  postedMessage: IMessage;
}

export interface IThunkCreateIssueResult {
  createdIssue: IIssue;
}

export interface IThunkAddPlayerParameters {
  addedPlayer: IUser;
}

export interface IThunkCreateGameParameters {
  dealerInfo: IUser;
}

export interface IThunkPostMessageParameters {
  playerId: string;
  message: IMessage;
}

export interface IThunkCreateIssueParameters {
  dealerId: string;
  issue: IIssue;
}

export interface IThunkUpdateIssueParameters {
  dealerId: string;
  updatedIssue: IIssue;
}

export interface IThunkDeleteIssueParameters {
  dealerId: string;
  deletedIssueId: string;
}

export interface IThunkStartGameParameters {
  settings: IGameSettings;
}

export interface IThunkCancelGameParameters {
  dealerId: string;
}

export interface IThunkScoreIssueParameters {
  playerId: string;
  issueId: string;
  score: TCardScore;
}

export interface IThunkFinishGameParameters {
  dealerId: string;
}

export interface IThunkChangeCurrentIssueParameters {
  dealerId: string;
  issueId: string;
}

export interface IThunkKickPlayerParameters {
  dealerId: string;
  kickedPlayerId: string;
}

export interface IThunkKickPlayerVoteParameters {
  votingPlayerId: string;
  kickedPlayerId: string;
}

export interface IThunkCheckGameParameters {
  gameId: string;
}

export interface IThunkStartRoundParameters {
  dealerId: string;
  issueId: string;
}

export interface IThunkLeaveGameParameters {
  playerId: string;
}
