import { Socket } from 'socket.io-client';
import { currentUserActions } from '../../redux/slices/current-user/current-user-slice';
import { gameSettingsActions } from '../../redux/slices/game-settings/game-settings-slice';
import { gameActions } from '../../redux/slices/game/game-slice';
import { lobbyPageActions } from '../../redux/slices/lobby-page/lobby-page';
import { votingKickActions } from '../../redux/slices/voting-kick/voting-kick';
import { store } from '../../redux/store';
import {
  IGameSettings,
  IIssue,
  IMessage,
  IUser,
  TCardScore,
  TGameStatus,
  TUserRole,
} from '../../redux/types';
import {
  IAddIssueResponseWS,
  IAddPlayerResponseWS,
  IDeleteIssueResponseWS,
  IKickPlayerResponseWS,
  IStartGameResponseWS,
  IStartVotingToKickResponseWS,
  IUpdateIssueResponseWS,
  IVoteToKickResponseWS,
} from './types';

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

export class GameService {
  constructor(private io: Socket) {}

  init(): void {
    this.io.on('connection', () => {
      console.log('server connect');
    });
    this.io.on('playerAdded', this.playerAdded);
    this.io.on('issueUpdated', this.issueUpdated);
    this.io.on('issueCreated', this.issueCreated);
    this.io.on('issueDeleted', this.issueDeleted);
    this.io.on('gameCancelled', this.gameCancelled);
    this.io.on('gameStarted', this.gameStarted);
    this.io.on('gameFinished', this.gameFinished);
    this.io.on('playerKicked', this.playerKicked);
    this.io.on('playerKickedByVote', this.playerKickedByVote);
    this.io.on('votingToKickStarted', this.votingToKickStarted);
  }

  playerAdded({ addedPlayer }: IAddPlayerResponseWS): void {
    const players = store.getState().game.players;
    store.dispatch(gameActions.changePlayers(players.concat(addedPlayer)));
  }

  issueUpdated({ updatedIssue }: IUpdateIssueResponseWS): void {
    store.dispatch(
      gameActions.updateIssue({
        issueId: updatedIssue.id,
        updatedIssue: updatedIssue,
      })
    );
  }

  issueCreated({ addedIssue }: IAddIssueResponseWS): void {
    const issues = store.getState().game.issues;
    store.dispatch(gameActions.changeIssues(issues.concat(addedIssue)));
  }

  issueDeleted({ deletedIssueId }: IDeleteIssueResponseWS): void {
    store.dispatch(gameActions.deleteIssue(deletedIssueId));
  }

  gameCancelled(): void {
    store.dispatch(lobbyPageActions.toggleGameCancelled());
    store.dispatch(gameActions.resetGame());
  }

  gameStarted({ settings }: IStartGameResponseWS): void {
    store.dispatch(gameSettingsActions.changeSettings(settings));
    store.dispatch(gameActions.changeStatus(TGameStatus.started));
  }

  gameFinished(): void {
    store.dispatch(gameActions.resetGame());
  }

  votingToKickStarted({
    kickedPlayerId,
    votingPlayerId,
  }: IStartVotingToKickResponseWS): void {
    const currentUser = store.getState().currentUser;
    if (
      currentUser.id !== kickedPlayerId &&
      currentUser.role !== TUserRole.dealer
    ) {
      store.dispatch(
        votingKickActions.changeVotingKick({ kickedPlayerId, votingPlayerId })
      );
    }
  }

  playerKickedByVote({ kickedPlayerId }: IVoteToKickResponseWS): void {
    const currentUser = store.getState().currentUser;
    if (currentUser.id === kickedPlayerId) {
      store.dispatch(currentUserActions.changeCurrentUser({ kicked: true }));
      store.dispatch(gameActions.resetGame());
      store.dispatch(votingKickActions.resetVotingKick());
    } else {
      store.dispatch(gameActions.deletePlayer(kickedPlayerId));
    }
  }

  playerKicked({ kickedPlayerId }: IKickPlayerResponseWS): void {
    const currentUserId = store.getState().currentUser.id;
    if (currentUserId !== kickedPlayerId) {
      store.dispatch(currentUserActions.changeCurrentUser({ kicked: true }));
      store.dispatch(gameActions.resetGame());
      // store.dispatch(currentUserActions.changeCurrentUser({kicked: false}));
    } else {
      store.dispatch(gameActions.deletePlayer(kickedPlayerId));
    }
  }
}
