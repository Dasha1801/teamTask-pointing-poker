import {
  IClientAddPlayerParameters,
  IClientCancelGameParameters,
  IClientChangeCurrentIssueParameters,
  IClientCheckGameParameters,
  IClientCreateGameParameters,
  IClientCreateIssueParameters,
  IClientDeleteIssueParameters,
  IClientFinishGameParameters,
  IClientKickPlayerParameters,
  IClientLeaveGameParameters,
  IClientPostMessageParameters,
  IClientScoreIssueParameters,
  IClientStartGameParameters,
  IClientStartRoundParameters,
  IClientStartVotingToKickParameters,
  IClientUpdateIssueParameters,
  IClientVoteToKickParameters,
} from '../../redux/types';
import { APP_CONSTANTS } from '../constants';
import { socketIO } from './socket';
import {
  IAddPlayerResponse,
  IChangeCurrentIssueResponse,
  ICheckGameResponse,
  IConnectResponse,
  ICreateGameResponse,
  ICreateIssueResponse,
  IKickPlayerResponse,
  ILeaveGameResponse,
  IPostMessageResponse,
  IResponse,
  IStartGameResponse,
  IStartRoundResponse,
} from './types';

async function asyncEmit<T, K>(event: string, data: T): Promise<K> {
  return new Promise((resolve) =>
    socketIO.emit(event, data, (response: K) => {
      return resolve(response);
    })
  );
}

export class ApiService {
  static async connect(): Promise<IConnectResponse> {
    const json = fetch(`${APP_CONSTANTS.SERVER_URL}/connect`).then((response) =>
      response.json()
    );
    socketIO.connect();
    return { ...json, socketId: socketIO.id };
  }

  static async createGame(
    dealerInfo: IClientCreateGameParameters
  ): Promise<Partial<ICreateGameResponse>> {
    const result: Partial<ICreateGameResponse> = await asyncEmit<
      IClientCreateGameParameters,
      Partial<ICreateGameResponse>
    >('createGame', dealerInfo);
    return result;
  }

  static async addPlayer({
    addedPlayer,
    gameId,
  }: IClientAddPlayerParameters): Promise<Partial<IAddPlayerResponse>> {
    const result: Partial<IAddPlayerResponse> = await asyncEmit<
      IClientAddPlayerParameters,
      Partial<IAddPlayerResponse>
    >('addPlayer', { addedPlayer, gameId });
    return result;
  }

  static async checkGame({
    gameId,
  }: IClientCheckGameParameters): Promise<ICheckGameResponse> {
    const json = await fetch(`${APP_CONSTANTS.SERVER_URL}/check-game`, {
      method: 'POST',
      body: JSON.stringify({ gameId }),
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => response.json());
    return json;
  }

  static async postMessage({
    playerId,
    message,
    gameId,
  }: IClientPostMessageParameters): Promise<IPostMessageResponse> {
    const json = await fetch(`${APP_CONSTANTS.SERVER_URL}/post-message`, {
      method: 'POST',
      body: JSON.stringify({ playerId, message, gameId }),
    }).then((response) => response.json());
    return json;
  }

  static async leaveGame({
    playerId,
    gameId,
  }: IClientLeaveGameParameters): Promise<ILeaveGameResponse> {
    const json = await fetch(`${APP_CONSTANTS.SERVER_URL}/leave-message`, {
      method: 'POST',
      body: JSON.stringify({ playerId, gameId }),
    }).then((response) => response.json());
    return json;
  }

  static async startRound({
    dealerId,
    issueId,
    gameId,
  }: IClientStartRoundParameters): Promise<IStartRoundResponse> {
    const json = await fetch(`${APP_CONSTANTS.SERVER_URL}/start-round`, {
      method: 'POST',
      body: JSON.stringify({ dealerId, issueId, gameId }),
    }).then((response) => response.json());
    return json;
  }

  static async kickPlayer({
    dealerId,
    kickedPlayerId,
    gameId,
  }: IClientKickPlayerParameters): Promise<Partial<IKickPlayerResponse>> {
    const result = await asyncEmit<
      IClientKickPlayerParameters,
      Partial<IKickPlayerResponse>
    >('kickPlayer', { dealerId, kickedPlayerId, gameId });
    return result;
  }

  static async startVotingToKick({
    votingPlayerId,
    kickedPlayerId,
    gameId,
  }: IClientStartVotingToKickParameters): Promise<IResponse> {
    const result = await asyncEmit<
      IClientStartVotingToKickParameters,
      IResponse
    >('startVotingToKick', { votingPlayerId, kickedPlayerId, gameId });
    return result;
  }

  static async voteToKick({
    votingPlayerId,
    kickedPlayerId,
    gameId,
    accept,
  }: IClientVoteToKickParameters): Promise<IResponse> {
    const result = await asyncEmit<IClientVoteToKickParameters, IResponse>(
      'voteToKick',
      { votingPlayerId, kickedPlayerId, gameId, accept }
    );
    return result;
  }

  static async createIssue({
    dealerId,
    addedIssue,
    gameId,
  }: IClientCreateIssueParameters): Promise<Partial<ICreateIssueResponse>> {
    const result = await asyncEmit<
      IClientCreateIssueParameters,
      Partial<ICreateGameResponse>
    >('createIssue', { dealerId, addedIssue, gameId });
    return result;
  }

  static async updateIssue({
    dealerId,
    updatedIssue,
    gameId,
  }: IClientUpdateIssueParameters): Promise<IResponse> {
    const result = await asyncEmit<IClientUpdateIssueParameters, IResponse>(
      'updateIssue',
      { dealerId, updatedIssue, gameId }
    );
    return result;
  }

  static async deleteIssue({
    dealerId,
    deletedIssueId,
    gameId,
  }: IClientDeleteIssueParameters): Promise<IResponse> {
    const result = await asyncEmit<IClientDeleteIssueParameters, IResponse>(
      'deleteIssue',
      { dealerId, deletedIssueId, gameId }
    );
    return result;
  }

  static async startGame({
    dealerId,
    settings,
    gameId,
  }: IClientStartGameParameters): Promise<Partial<IStartGameResponse>> {
    const result = await asyncEmit<
      IClientStartGameParameters,
      Partial<IStartGameResponse>
    >('startGame', { dealerId, gameId, settings });
    return result;
  }

  static async cancelGame({
    dealerId,
    gameId,
  }: IClientCancelGameParameters): Promise<IResponse> {
    const result = await asyncEmit<IClientCancelGameParameters, IResponse>(
      'cancelGame',
      { dealerId, gameId }
    );
    return result;
  }

  static async scoreIssue({
    playerId,
    issueId,
    score,
    gameId,
  }: IClientScoreIssueParameters): Promise<IStartRoundResponse> {
    const json = await fetch(`${APP_CONSTANTS.SERVER_URL}/score-issue`, {
      method: 'POST',
      body: JSON.stringify({ playerId, issueId, score, gameId }),
    }).then((response) => response.json());
    return json;
  }

  static async finishGame({
    dealerId,
    gameId,
  }: IClientFinishGameParameters): Promise<IResponse> {
    const result = await asyncEmit<IClientFinishGameParameters, IResponse>(
      'finishGame',
      { dealerId, gameId }
    );
    return result;
  }

  static async changeCurrentIssue({
    dealerId,
    issueId,
    gameId,
  }: IClientChangeCurrentIssueParameters): Promise<IChangeCurrentIssueResponse> {
    const json = await fetch(`${APP_CONSTANTS.SERVER_URL}/cancel-game`, {
      method: 'POST',
      body: JSON.stringify({ dealerId, issueId, gameId }),
    }).then((response) => response.json());
    return json;
  }
}
