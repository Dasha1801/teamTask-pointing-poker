import { Socket } from 'socket.io-client';
import { gameSelectors } from '../../redux/selectors';
import { appActions } from '../../redux/slices/app/app-slice';
import { currentUserActions } from '../../redux/slices/current-user/current-user-slice';
import { entryRequestsActions } from '../../redux/slices/entry-requests/entry-requests';
import { gamePageActions } from '../../redux/slices/game-page/game-page';
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
  Message,
  TCardScore,
  TGameStatus,
  TUserRole,
  User,
} from '../../redux/types';
import { InfoMessage, TInfoMessageType } from '../../redux/types/info-message';
import {
  IAddIssueResponseWS,
  IAddPlayerResponseWS,
  IAdmitPlayerResponseWS,
  IChangeCurrentIssueResponseWS,
  IDeleteIssueResponseWS,
  IEntryRequestResponseWS,
  IFinishGameResponseWS,
  IIssueScoreUpdatedResponseWS,
  IKickPlayerResponseWS,
  ILeaveGameResponseWS,
  IPostMessageResponseWS,
  IRejectPlayerResponseWS,
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

enum SocketResponseEvents {
  roundFinished = 'roundFinished',
  roundStarted = 'roundStarted',
  gameFinished = 'gameFinished',
  playerAdded = 'playerAdded',
  issueCreated = 'issueCreated',
  currentIssueChanged = 'currentIssueChanged',
  issueDeleted = 'issueDeleted',
  issueUpdated = 'issueUpdated',
  gameCancelled = 'gameCancelled',
  gameStarted = 'gameStarted',
  playerLeft = 'playerLeft',
  playerKicked = 'playerKicked',
  playerKickedByVote = 'playerKickedByVote',
  votingToKickStarted = 'votingToKickStarted',
  messagePosted = 'messagePosted',
  playerAdmitted = 'playerAdmitted',
  playerRejected = 'playerRejected',
  entryRequested = 'entryRequested',
  issueScoreUpdated = 'issueScoreUpdated',
}

export class GameService {
  constructor(private io: Socket, private ioDealer: Socket) {}

  init(): void {
    this.io.on('connection', () => {
      console.log('server connect');
    });
    this.io.on('test', () => console.log('hey client'));
    this.ioDealer.on('test', () => console.log('hey dealer'));

    this.io.on(SocketResponseEvents.playerAdded, this.playerAdded);
    this.io.on(SocketResponseEvents.issueUpdated, this.issueUpdated);
    this.io.on(SocketResponseEvents.issueCreated, this.issueCreated);
    this.io.on(SocketResponseEvents.issueDeleted, this.issueDeleted);
    this.io.on(SocketResponseEvents.gameCancelled, this.gameCancelled);
    this.io.on(SocketResponseEvents.gameStarted, this.gameStarted);
    this.io.on(SocketResponseEvents.gameFinished, this.gameFinished);
    this.io.on(SocketResponseEvents.playerLeft, this.playerLeft);
    this.io.on(SocketResponseEvents.playerKicked, this.playerKicked);
    this.io.on(
      SocketResponseEvents.playerKickedByVote,
      this.playerKickedByVote
    );
    this.io.on(
      SocketResponseEvents.votingToKickStarted,
      this.votingToKickStarted
    );
    this.io.on(SocketResponseEvents.messagePosted, this.messagePosted);
    this.io.on(
      SocketResponseEvents.currentIssueChanged,
      this.currentIssueChanged
    );
    this.io.on(SocketResponseEvents.roundStarted, this.roundStarted);
    this.io.on(SocketResponseEvents.roundFinished, this.roundFinished);
    this.io.on(SocketResponseEvents.entryRequested, this.entryRequested);
    this.io.on(SocketResponseEvents.playerAdmitted, this.playerAdmitted);
    this.io.on(SocketResponseEvents.playerRejected, this.playerRejected);
    this.io.on(SocketResponseEvents.issueScoreUpdated, this.issueScoreUpdated);
  }

  issueScoreUpdated({
    issueId,
    roundResult,
    totalScore,
  }: IIssueScoreUpdatedResponseWS): void {
    console.debug('score updated');
    store.dispatch(
      gameActions.updateIssue({
        issueId,
        updatedIssue: { lastRoundResult: roundResult, score: totalScore },
      })
    );
  }

  playerAdmitted({
    playerId,
    messages,
    issues,
    players,
    gameStatus,
    currentIssueId,
    gameId,
    gameSettings,
  }: IAdmitPlayerResponseWS): void {
    console.log('player admitted', gameId, gameStatus);
    store.dispatch(gameActions.changeId(gameId));
    store.dispatch(gameActions.changeMessages(messages));
    store.dispatch(gameActions.changeIssues(issues));
    store.dispatch(gameActions.changePlayers(players));
    store.dispatch(currentUserActions.changeCurrentUser({ id: playerId }));
    store.dispatch(gameActions.changeCurrentIssueId(currentIssueId));
    store.dispatch(gameSettingsActions.changeSettings(gameSettings));
    store.dispatch(gameActions.changeStatus(gameStatus));

    store.dispatch(
      appActions.addOneInfoMessage(
        new InfoMessage('You have joined the game').toObject()
      )
    );
  }

  playerRejected({}: IRejectPlayerResponseWS): void {
    store.dispatch(
      appActions.addOneInfoMessage(
        new InfoMessage(
          'Dealer has rejected your request =(',
          TInfoMessageType.error
        ).toObject()
      )
    );
  }

  entryRequested({
    playerId,
    firstName,
    lastName,
    role,
    jobPosition,
  }: IEntryRequestResponseWS): void {
    console.log('entry requested');
    store.dispatch(
      entryRequestsActions.pushEntryRequest(
        new User({
          id: playerId,
          firstName,
          lastName,
          role,
          jobPosition,
        }).toObject()
      )
    );
  }

  roundStarted(): void {
    const timer = store.getState().gameSettings.timer;
    if (timer) {
      store.dispatch(gamePageActions.changeTimer(timer));
    }
    store.dispatch(gameActions.changeStatus(TGameStatus.roundInProgress));
    store.dispatch(
      appActions.addOneInfoMessage(new InfoMessage('Round started').toObject())
    );
  }

  roundFinished({ roundResult, totalScore }: IFinishGameResponseWS): void {
    const currentIssue = gameSelectors.selectCurrentIssue(store.getState());
    if (currentIssue) {
      store.dispatch(
        gameActions.updateIssue({
          issueId: currentIssue.id,
          updatedIssue: {
            ...currentIssue,
            lastRoundResult: roundResult,
            score: totalScore,
          },
        })
      );
    }
    store.dispatch(gameActions.changeStatus(TGameStatus.started));
    store.dispatch(gamePageActions.changeTimer({ minutes: 0, seconds: 0 }));
    store.dispatch(
      appActions.addOneInfoMessage(new InfoMessage('Round finished').toObject())
    );
  }

  playerAdded({ addedPlayer }: IAddPlayerResponseWS): void {
    const players = store.getState().game.players;
    store.dispatch(gameActions.changePlayers(players.concat(addedPlayer)));
    const playerName = User.getFullName(
      addedPlayer.firstName,
      addedPlayer.lastName
    );
    store.dispatch(
      appActions.addOneInfoMessage(
        new InfoMessage(`Player ${playerName} has joined the game`).toObject()
      )
    );
  }

  issueUpdated({ updatedIssue }: IUpdateIssueResponseWS): void {
    store.dispatch(
      gameActions.updateIssue({
        issueId: updatedIssue.id,
        updatedIssue: updatedIssue,
      })
    );
    store.dispatch(
      appActions.addOneInfoMessage(
        new InfoMessage(`Issue ${updatedIssue.title} updated`).toObject()
      )
    );
  }

  issueCreated({ addedIssue }: IAddIssueResponseWS): void {
    const issues = store.getState().game.issues;
    store.dispatch(gameActions.changeIssues(issues.concat(addedIssue)));
    store.dispatch(
      appActions.addOneInfoMessage(new InfoMessage('Issue added').toObject())
    );
    store.dispatch(
      appActions.addOneInfoMessage(
        new InfoMessage(`Issue ${addedIssue.title} created`).toObject()
      )
    );
  }

  issueDeleted({ deletedIssueId, title }: IDeleteIssueResponseWS): void {
    store.dispatch(gameActions.deleteIssue(deletedIssueId));
    store.dispatch(
      appActions.addOneInfoMessage(
        new InfoMessage(`Issue ${title} deleted`).toObject()
      )
    );
  }

  gameCancelled(): void {
    console.log('game cancelled');

    store.dispatch(lobbyPageActions.toggleGameCancelled());
    store.dispatch(gameActions.resetGame());
    store.dispatch(
      appActions.addOneInfoMessage(
        new InfoMessage(`Dealer has cancelled the game`).toObject()
      )
    );
  }

  gameStarted({ settings }: IStartGameResponseWS): void {
    console.log('game started');

    store.dispatch(gameSettingsActions.changeSettings(settings));
    store.dispatch(gameActions.changeStatus(TGameStatus.started));
    store.dispatch(
      appActions.addOneInfoMessage(new InfoMessage('Game started').toObject())
    );
  }

  gameFinished(): void {
    store.dispatch(gameActions.resetGame());
    store.dispatch(
      appActions.addOneInfoMessage(
        new InfoMessage(`Game finished, thanks for playing`).toObject()
      )
    );
  }

  playerLeft({ playerId, firstName, lastName }: ILeaveGameResponseWS): void {
    console.log('player left', playerId);

    const currentUser = store.getState().currentUser;
    if (currentUser.id === playerId) {
      store.dispatch(gameActions.resetGame());
      store.dispatch(gameSettingsActions.resetSettings());
      store.dispatch(
        currentUserActions.changeCurrentUser({
          id: '',
        })
      );
      store.dispatch(
        appActions.addOneInfoMessage(
          new InfoMessage(`You have left the game`).toObject()
        )
      );
    } else {
      store.dispatch(gameActions.deletePlayer(playerId));
      const playerName = User.getFullName(firstName, lastName);
      store.dispatch(
        appActions.addOneInfoMessage(
          new InfoMessage(`Player ${playerName} has left the game`).toObject()
        )
      );
    }
  }

  votingToKickStarted({
    kickedPlayerId,
    votingPlayerId,
  }: IStartVotingToKickResponseWS): void {
    console.log('voting start');

    const currentUser = store.getState().currentUser;
    if (
      currentUser.id !== kickedPlayerId &&
      currentUser.role !== TUserRole.dealer
    ) {
      console.log('dispatch popup');

      store.dispatch(
        votingKickActions.changeVotingKick({ kickedPlayerId, votingPlayerId })
      );
    }
  }

  playerKickedByVote({
    kickedPlayerId,
    firstName,
    lastName,
  }: IVoteToKickResponseWS): void {
    const currentUser = store.getState().currentUser;
    if (currentUser.id === kickedPlayerId) {
      store.dispatch(currentUserActions.changeCurrentUser({ kicked: true }));
      store.dispatch(gameActions.resetGame());
      store.dispatch(votingKickActions.resetVotingKick());
      store.dispatch(
        appActions.addOneInfoMessage(
          new InfoMessage(
            'You have been kicked from the game by vote =('
          ).toObject()
        )
      );
    } else {
      store.dispatch(gameActions.deletePlayer(kickedPlayerId));
      const playerName = User.getFullName(firstName, lastName);
      store.dispatch(
        appActions.addOneInfoMessage(
          new InfoMessage(
            `Player ${playerName} has been kicked from the game by vote`
          ).toObject()
        )
      );
    }
  }

  playerKicked({
    kickedPlayerId,
    firstName,
    lastName,
  }: IKickPlayerResponseWS): void {
    const currentUserId = store.getState().currentUser.id;
    if (currentUserId === kickedPlayerId) {
      store.dispatch(currentUserActions.changeCurrentUser({ kicked: true }));
      store.dispatch(gameActions.resetGame());
      store.dispatch(
        appActions.addOneInfoMessage(
          new InfoMessage(`You have been kicked from the game =(`).toObject()
        )
      );
    } else {
      store.dispatch(gameActions.deletePlayer(kickedPlayerId));
      const playerName = User.getFullName(firstName, lastName);
      store.dispatch(
        appActions.addOneInfoMessage(
          new InfoMessage(
            `Player ${playerName} has been kicked from the game`
          ).toObject()
        )
      );
    }
  }

  messagePosted({ message, messageId, userId }: IPostMessageResponseWS): void {
    store.dispatch(
      gameActions.postMessage(new Message({ id: messageId, userId, message }))
    );
  }

  currentIssueChanged({ issueId }: IChangeCurrentIssueResponseWS): void {
    console.log('issue changed', issueId);
    store.dispatch(gameActions.changeCurrentIssueId(issueId));
  }
}
