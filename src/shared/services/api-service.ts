import {
  IThunkScoreIssueParameters,
  IThunkFinishGameParameters,
  IThunkChangeCurrentIssueParameters,
  IThunkStartGameParameters,
  IThunkDeleteIssueParameters,
  IThunkUpdateIssueParameters,
  IThunkCreateIssueParameters,
  IThunkKickPlayerParameters,
  IThunkKickPlayerVoteParameters,
  IThunkPostMessageParameters,
  IThunkCheckGameParameters,
  IThunkStartRoundParameters,
  IThunkLeaveGameParameters,
  IThunkAddPlayerParameters,
  IThunkCreateGameParameters,
} from '../../redux/types';
import {
  IConnectResponse,
  ICreateGameResponse,
  IAddPlayerResponse,
  IStartRoundResponse,
  IPostMessageResponse,
  IFinishGameResponse,
  IChangeCurrentIssueResponse,
  ICreateIssueResponse,
  IUpdateIssueResponse,
  IDeleteIssueResponse,
  ILeaveGameResponse,
  IStartGameResponse,
  ICancelGameResponse,
  IKickPlayerResponse,
  ICheckGameResponse,
} from './types';
import {
  cancelGameResponseSuccess,
  changeCurrentIssueResponseSuccess,
  createIssueResponseSuccess,
  deleteIssueResponseSuccess,
  finishGameResponseSuccess,
  kickPlayerResponseSuccess,
  leaveGameResponseSuccess,
  mockAddPlayerResponseSuccess,
  mockConnectResponseSuccess,
  mockCreateGameResponseSuccess,
  mockPostMessageResponseSuccess,
  scoreIssueResponseSuccess,
  startGameResponseSuccess,
  startRoundResponseSuccess,
  updateIssueResponseSuccess,
  mockCheckGameResponseSuccess,
} from '../mocks';

export class ApiService {
  static async connect(): Promise<IConnectResponse> {
    const response: IConnectResponse = await Promise.resolve(
      mockConnectResponseSuccess
    );
    return response;
  }

  static async createGame({}: IThunkCreateGameParameters): Promise<ICreateGameResponse> {
    const response: ICreateGameResponse = await Promise.resolve(
      mockCreateGameResponseSuccess
    );
    return response;
  }

  static async addPlayer({}: IThunkAddPlayerParameters): Promise<IAddPlayerResponse> {
    const response: IAddPlayerResponse = await Promise.resolve(
      mockAddPlayerResponseSuccess
    );
    return response;
  }

  static async checkGame({}: IThunkCheckGameParameters): Promise<ICheckGameResponse> {
    const response: ICheckGameResponse = await Promise.resolve(
      mockCheckGameResponseSuccess
    );
    return response;
  }

  static async postMessage({}: IThunkPostMessageParameters): Promise<IPostMessageResponse> {
    const response: IPostMessageResponse = await Promise.resolve(
      mockPostMessageResponseSuccess
    );
    return response;
  }

  static async leaveGame({}: IThunkLeaveGameParameters): Promise<ILeaveGameResponse> {
    const response: ILeaveGameResponse = await Promise.resolve(
      leaveGameResponseSuccess
    );
    return response;
  }

  static async startRound({}: IThunkStartRoundParameters): Promise<IStartRoundResponse> {
    const response: IStartRoundResponse = await Promise.resolve(
      startRoundResponseSuccess
    );
    return response;
  }

  static async kickPlayer({}: IThunkKickPlayerParameters): Promise<IKickPlayerResponse> {
    const response: IKickPlayerResponse = await Promise.resolve(
      kickPlayerResponseSuccess
    );
    return response;
  }

  static async kickPlayerVote({}: IThunkKickPlayerVoteParameters): Promise<IKickPlayerResponse> {
    const response: IKickPlayerResponse = await Promise.resolve(
      kickPlayerResponseSuccess
    );
    return response;
  }

  static async createIssue({}: IThunkCreateIssueParameters): Promise<ICreateIssueResponse> {
    const response: ICreateIssueResponse = await Promise.resolve(
      createIssueResponseSuccess
    );
    return response;
  }

  static async updateIssue({}: IThunkUpdateIssueParameters): Promise<IUpdateIssueResponse> {
    const response: IUpdateIssueResponse = await Promise.resolve(
      updateIssueResponseSuccess
    );
    return response;
  }

  static async deleteIssue({}: IThunkDeleteIssueParameters): Promise<IDeleteIssueResponse> {
    const response: IDeleteIssueResponse = await Promise.resolve(
      deleteIssueResponseSuccess
    );
    return response;
  }

  static async startGame({}: IThunkStartGameParameters): Promise<IStartGameResponse> {
    const response: IStartGameResponse = await Promise.resolve(
      startGameResponseSuccess
    );
    return response;
  }

  static async cancelGame({}: IThunkFinishGameParameters): Promise<ICancelGameResponse> {
    const response: ICancelGameResponse = await Promise.resolve(
      cancelGameResponseSuccess
    );
    return response;
  }

  static async scoreIssue({}: IThunkScoreIssueParameters): Promise<IStartRoundResponse> {
    const response: IStartRoundResponse = await Promise.resolve(
      scoreIssueResponseSuccess
    );
    return response;
  }

  static async finishGame({}: IThunkFinishGameParameters): Promise<IFinishGameResponse> {
    const response: IFinishGameResponse = await Promise.resolve(
      finishGameResponseSuccess
    );
    return response;
  }

  static async changeCurrentIssue({}: IThunkChangeCurrentIssueParameters): Promise<IChangeCurrentIssueResponse> {
    const response: IChangeCurrentIssueResponse = await Promise.resolve(
      changeCurrentIssueResponseSuccess
    );
    return response;
  }
}
