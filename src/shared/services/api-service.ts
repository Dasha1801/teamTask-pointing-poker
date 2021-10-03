import {
  IClientAddPlayerParameters,
  IClientAdmitPlayerParameters,
  IClientCancelGameParameters,
  IClientChangeCurrentIssueParameters,
  IClientCheckGameParameters,
  IClientCreateGameParameters,
  IClientCreateIssueParameters,
  IClientDeleteIssueParameters,
  IClientFinishGameParameters,
  IClientFinishRoundParameters,
  IClientGetNextIssueParameters,
  IClientKickPlayerParameters,
  IClientLeaveGameParameters,
  IClientPostMessageParameters,
  IClientRejectPlayerParameters,
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
  IGetNextIssueResponse,
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
    console.log(socketIO.id);
    return { ...json, socketId: socketIO.id };
  }

  static async admitPlayer({
    gameId,
  }: IClientAdmitPlayerParameters): Promise<Partial<IResponse>> {
    const response: Partial<IResponse> = await asyncEmit<
      IClientAdmitPlayerParameters,
      Partial<IResponse>
    >('admitPlayer', { gameId });
    return response;
  }

  static async rejectPlayer({
    gameId,
  }: IClientRejectPlayerParameters): Promise<Partial<IResponse>> {
    const response: Partial<IResponse> = await asyncEmit<
      IClientRejectPlayerParameters,
      Partial<IResponse>
    >('rejectPlayer', { gameId });
    return response;
  }

  static async createGame(
    dealerInfo: IClientCreateGameParameters
  ): Promise<Partial<ICreateGameResponse>> {
    const response: Partial<ICreateGameResponse> = await asyncEmit<
      IClientCreateGameParameters,
      Partial<ICreateGameResponse>
    >('createGame', dealerInfo);
    return response;
  }

  static async addPlayer({
    addedPlayer,
    gameId,
  }: IClientAddPlayerParameters): Promise<Partial<IAddPlayerResponse>> {
    const response: Partial<IAddPlayerResponse> = await asyncEmit<
      IClientAddPlayerParameters,
      Partial<IAddPlayerResponse>
    >('addPlayer', { addedPlayer, gameId });
    return response;
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
    message,
    gameId,
  }: IClientPostMessageParameters): Promise<Partial<IPostMessageResponse>> {
    const response = await asyncEmit<
      IClientPostMessageParameters,
      Partial<IPostMessageResponse>
    >('postMessage', { message, gameId });
    return response;
  }

  static async leaveGame({
    playerId,
    gameId,
  }: IClientLeaveGameParameters): Promise<Partial<ILeaveGameResponse>> {
    const response = await asyncEmit<
      IClientLeaveGameParameters,
      Partial<ILeaveGameResponse>
    >('leaveGame', { playerId, gameId });
    return response;
  }

  static async startRound({
    dealerId,
    issueId,
    gameId,
  }: IClientStartRoundParameters): Promise<Partial<IStartRoundResponse>> {
    const response = await asyncEmit<
      IClientStartRoundParameters,
      Partial<IStartRoundResponse>
    >('startRound', { dealerId, issueId, gameId });
    return response;
  }

  static async finishRound({
    dealerId,
    gameId,
  }: IClientFinishRoundParameters): Promise<Partial<IResponse>> {
    const response = await asyncEmit<
      IClientFinishRoundParameters,
      Partial<IResponse>
    >('finishRound', { dealerId, gameId });
    return response;
  }

  static async kickPlayer({
    dealerId,
    kickedPlayerId,
    gameId,
  }: IClientKickPlayerParameters): Promise<Partial<IKickPlayerResponse>> {
    const response = await asyncEmit<
      IClientKickPlayerParameters,
      Partial<IKickPlayerResponse>
    >('kickPlayer', { dealerId, kickedPlayerId, gameId });
    return response;
  }

  static async startVotingToKick({
    votingPlayerId,
    kickedPlayerId,
    gameId,
  }: IClientStartVotingToKickParameters): Promise<IResponse> {
    const response = await asyncEmit<
      IClientStartVotingToKickParameters,
      IResponse
    >('startVotingToKick', { votingPlayerId, kickedPlayerId, gameId });
    return response;
  }

  static async voteToKick({
    votingPlayerId,
    kickedPlayerId,
    gameId,
    accept,
  }: IClientVoteToKickParameters): Promise<IResponse> {
    const response = await asyncEmit<IClientVoteToKickParameters, IResponse>(
      'voteToKick',
      { votingPlayerId, kickedPlayerId, gameId, accept }
    );
    return response;
  }

  static async getNextIssue({
    dealerId,
    gameId,
  }: IClientGetNextIssueParameters): Promise<Partial<IGetNextIssueResponse>> {
    const response = await asyncEmit<
      IClientGetNextIssueParameters,
      Partial<IGetNextIssueResponse>
    >('getNextIssue', { dealerId, gameId });
    return response;
  }

  static async createIssue({
    dealerId,
    addedIssue,
    gameId,
  }: IClientCreateIssueParameters): Promise<Partial<ICreateIssueResponse>> {
    const response = await asyncEmit<
      IClientCreateIssueParameters,
      Partial<ICreateGameResponse>
    >('createIssue', { dealerId, addedIssue, gameId });
    return response;
  }

  static async updateIssue({
    dealerId,
    updatedIssue,
    gameId,
  }: IClientUpdateIssueParameters): Promise<IResponse> {
    const response = await asyncEmit<IClientUpdateIssueParameters, IResponse>(
      'updateIssue',
      { dealerId, updatedIssue, gameId }
    );
    return response;
  }

  static async deleteIssue({
    dealerId,
    deletedIssueId,
    gameId,
  }: IClientDeleteIssueParameters): Promise<IResponse> {
    const response = await asyncEmit<IClientDeleteIssueParameters, IResponse>(
      'deleteIssue',
      { dealerId, deletedIssueId, gameId }
    );
    return response;
  }

  static async startGame({
    dealerId,
    settings,
    gameId,
  }: IClientStartGameParameters): Promise<Partial<IStartGameResponse>> {
    console.log('start game');

    const response = await asyncEmit<
      IClientStartGameParameters,
      Partial<IStartGameResponse>
    >('startGame', { dealerId, gameId, settings });
    return response;
  }

  static async cancelGame({
    dealerId,
    gameId,
  }: IClientCancelGameParameters): Promise<IResponse> {
    const response = await asyncEmit<IClientCancelGameParameters, IResponse>(
      'cancelGame',
      { dealerId, gameId }
    );
    return response;
  }

  static async scoreIssue({
    playerId,
    issueId,
    score,
    gameId,
  }: IClientScoreIssueParameters): Promise<Partial<IResponse>> {
    const response = await asyncEmit<
      IClientScoreIssueParameters,
      Partial<IStartRoundResponse>
    >('scoreIssue', { playerId, issueId, gameId, score });
    return response;
  }

  static async finishGame({
    dealerId,
    gameId,
  }: IClientFinishGameParameters): Promise<IResponse> {
    const response = await asyncEmit<IClientFinishGameParameters, IResponse>(
      'finishGame',
      { dealerId, gameId }
    );
    return response;
  }

  static async changeCurrentIssue({
    dealerId,
    issueId,
    gameId,
  }: IClientChangeCurrentIssueParameters): Promise<
    Partial<IChangeCurrentIssueResponse>
  > {
    const response = await asyncEmit<
      IClientChangeCurrentIssueParameters,
      Partial<IChangeCurrentIssueResponse>
    >('changeCurrentIssue', { dealerId, issueId, gameId });
    return response;
  }
}
