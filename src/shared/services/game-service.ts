import {
  IGameSettings,
  IIssue,
  IMessage,
  IUser,
  TCardScore,
} from '../../redux/types';

export interface IGameService {
  gameCancelled: () => void;
  gameStarted: (settings: IGameSettings) => void;
  playerAdded: (player: IUser) => void;
  issueCreated: (issue: IIssue) => void;
  issueUpdated: (issueId: string, issue: IIssue) => void;
  issueDeleted: (issueId: string) => void;
  messagePosted: (message: IMessage) => void;
  playerKickVoted: (playerId: string) => void;
  playerLeft: (playerId: string) => void;
  playerKicked: (playerId: string) => void;
  playerKickedByVote: (playerId: string) => void;
  currentIssueChanged: (issueId: string) => void;
  roundStarted: (issueId: string) => void;
  roundFinished: (issueId: string) => void;
  issueScored: (issueId: string, playerId: string, score: TCardScore) => void;
}
