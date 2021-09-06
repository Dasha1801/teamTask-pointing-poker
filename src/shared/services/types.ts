import { TStatusCode } from '../constants';
import { IUser, IMessage, IIssue } from '../../redux/types';

interface IResponse {
  statusCode: TStatusCode;
  message?: string;
}

export interface IConnectResponse extends IResponse {
  connectionStatus: boolean;
}

export interface ICheckGameResponse extends IResponse {
  gameExists: boolean;
}

export interface ICreateGameResponse extends IResponse {
  dealerId: string;
  gameId: string;
}

export interface IAddPlayerResponse extends IResponse {
  gameId: string;
  dealer: IUser;
  playerId: string;
  messages: IMessage[];
  issues: IIssue[];
  players: IUser[];
}

export interface IPostMessageResponse extends IResponse {
  gameId: string;
  messageId: string;
}

export interface IStartRoundResponse extends IResponse {
  gameId: string;
  issueId: string;
}

export interface IScoreIssueResponse extends IResponse {
  gameId: string;
  issueId: string;
}

export interface IFinishGameResponse extends IResponse {
  gameId: string;
}

export interface IChangeCurrentIssueResponse extends IResponse {
  gameId: string;
  issueId: string;
}

export interface ICreateIssueResponse extends IResponse {
  gameId: string;
  issueId: string;
}

export interface IUpdateIssueResponse extends IResponse {
  gameId: string;
  issueId: string;
}

export interface IDeleteIssueResponse extends IResponse {
  gameId: string;
  deletedIssueId: string;
}

export interface ILeaveGameResponse extends IResponse {
  gameId: string;
}

export interface IStartGameResponse extends IResponse {
  gameId: string;
}

export interface ICancelGameResponse extends IResponse {
  gameId: string;
}

export interface IKickPlayerResponse extends IResponse {
  gameId: string;
  kickedPlayerId: string;
}
