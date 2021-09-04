import { IGameSettings, IMessage, IUser, TCardScore } from '../../redux/types';

export interface IApiService {
  connect: () => void;
  createGame: () => void;
  addPlayer: (player: IUser) => void;
  postMessage: (message: IMessage) => void;
  startRound: () => void;
  kickPlayer: (playerId: string) => void;
  voteKickPlayer: (playerId: string) => void;
  createIssue: () => void;
  updateIssue: () => void;
  deleteIssue: () => void;
  startGame: (settings: IGameSettings) => void;
  cancelGame: () => void;
  scoreIssue: (issueId: string, score: TCardScore) => void;
  finishGame: () => void;
  setCurrentIssue: (issueId: string) => void;
}
