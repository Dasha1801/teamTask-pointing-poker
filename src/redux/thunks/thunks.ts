import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiService } from '../../shared/services/api-service';
import {
  IAddPlayerResponse,
  IChangeCurrentIssueResponse,
  ICheckGameResponse,
  IConnectResponse,
  ICreateGameResponse,
} from '../../shared/services/types';
import { appActions } from '../slices/app/app-slice';
import { currentUserActions } from '../slices/current-user/current-user-slice';
import { gameSettingsActions } from '../slices/game-settings/game-settings-slice';
import { gameActions } from '../slices/game/game-slice';
import {
  IClientAddPlayerParameters,
  IClientAddPlayerResult,
  IClientCancelGameParameters,
  IClientChangeCurrentIssueParameters,
  IClientCheckGameParameters,
  IClientCreateGameParameters,
  IClientCreateIssueParameters,
  IClientDeleteIssueParameters,
  IClientFinishGameParameters,
  IClientKickPlayerParameters,
  IClientKickPlayerVoteParameters,
  IClientLeaveGameParameters,
  IClientPostMessageParameters,
  IClientScoreIssueParameters,
  IClientStartGameParameters,
  IClientStartRoundParameters,
  IClientUpdateIssueParameters,
  IClientVoteToKickParameters,
  ICreateGameRequestResult,
  Issue,
  IUser,
  Message,
  TGameStatus,
  TUserRole,
  User,
} from '../types';

export const connectThunk = createAsyncThunk<IConnectResponse, void>(
  'app/connectThunk',
  async (_, thunkApi) => {
    const response = await ApiService.connect();
    thunkApi.dispatch(
      appActions.changeConnectionStatus(response.connectionStatus)
    );
    thunkApi.dispatch(appActions.changeSocketId(response.socketId));
    return response;
  }
);

export const createGameThunk = createAsyncThunk<
  Partial<ICreateGameRequestResult>,
  IClientCreateGameParameters
>('game/createGameThunk', async ({ dealerInfo }, thunkApi) => {
  const result = await ApiService.createGame({ dealerInfo });
  if (result.message) {
    return result;
  }
  const { gameId, dealerId } = result as ICreateGameResponse;
  const dealer = new User({
    ...dealerInfo,
    id: dealerId,
    role: TUserRole.dealer,
  }).toObject();
  thunkApi.dispatch(currentUserActions.changeCurrentUser(dealer));
  thunkApi.dispatch(gameActions.changeId(gameId));
  thunkApi.dispatch(gameActions.changeStatus(TGameStatus.lobby));
  thunkApi.dispatch(gameActions.changePlayers([dealer]));
  return { dealer, gameId };
});

export const addPlayerThunk = createAsyncThunk<
  Partial<IClientAddPlayerResult>,
  IClientAddPlayerParameters
>('game/addPlayerThunk', async ({ addedPlayer, gameId }, thunkApi) => {
  const result = (await ApiService.addPlayer({
    addedPlayer,
    gameId,
  })) as IAddPlayerResponse;
  if (result.message) {
    return result;
  }
  const { playerId, dealer, messages, issues, players, gameStatus } = result;
  const player = new User({ ...addedPlayer, id: playerId }).toObject();
  thunkApi.dispatch(gameActions.changeMessages(messages));
  thunkApi.dispatch(gameActions.changeIssues(issues));
  thunkApi.dispatch(gameActions.changePlayers(players.concat(player)));
  thunkApi.dispatch(currentUserActions.changeCurrentUser(player));
  thunkApi.dispatch(gameActions.changeId(gameId));
  if (gameStatus === TGameStatus.lobby) {
    thunkApi.dispatch(gameActions.changeStatus(TGameStatus.lobby));
  } else {
    thunkApi.dispatch(gameActions.changeStatus(TGameStatus.started));
  }
  return { gameId, dealer, player, gameStatus };
});

export const checkGameThunk = createAsyncThunk<
  ICheckGameResponse,
  IClientCheckGameParameters
>('game/checkGameThunk', async ({ gameId }) => {
  const response = await ApiService.checkGame({ gameId });
  return response;
});

export const postMessageThunk = createAsyncThunk<
  void,
  IClientPostMessageParameters
>('game/postMessageThunk', async ({ playerId, message, gameId }, thunkApi) => {
  const { messageId } = await ApiService.postMessage({
    playerId,
    message,
    gameId,
  });
  const postedMessage = new Message({ ...message, id: messageId }).toObject();
  thunkApi.dispatch(gameActions.postMessage(postedMessage));
});

export const createIssueThunk = createAsyncThunk<
  void,
  IClientCreateIssueParameters
>(
  'game/createIssueThunk',
  async ({ dealerId, addedIssue, gameId }, thunkApi) => {
    const { issueId } = await ApiService.createIssue({
      dealerId,
      addedIssue,
      gameId,
    });
    const createdIssue = new Issue({ ...addedIssue, id: issueId }).toObject();
    thunkApi.dispatch(gameActions.createIssue(createdIssue));
  }
);

export const updateIssueThunk = createAsyncThunk<
  void,
  IClientUpdateIssueParameters
>(
  'game/updateIssueThunk',
  async ({ dealerId, updatedIssue, gameId }, thunkApi) => {
    await ApiService.updateIssue({ dealerId, updatedIssue, gameId });
    thunkApi.dispatch(
      gameActions.updateIssue({
        issueId: updatedIssue.id,
        updatedIssue: updatedIssue,
      })
    );
  }
);

export const deleteIssueThunk = createAsyncThunk<
  void,
  IClientDeleteIssueParameters
>(
  'game/deleteIssueThunk',
  async ({ dealerId, deletedIssueId, gameId }, thunkApi) => {
    await ApiService.deleteIssue({ dealerId, deletedIssueId, gameId });
    thunkApi.dispatch(gameActions.deleteIssue(deletedIssueId));
  }
);

export const startGameThunk = createAsyncThunk<
  void,
  IClientStartGameParameters
>('game/startGameThunk', async ({ dealerId, settings, gameId }, thunkApi) => {
  await ApiService.startGame({ dealerId, settings, gameId });
  thunkApi.dispatch(gameSettingsActions.changeSettings(settings));
  thunkApi.dispatch(gameActions.changeStatus(TGameStatus.started));
});

export const startVotingToKickThunk = createAsyncThunk<
  void,
  IClientKickPlayerVoteParameters
>(
  'game/startVotingToKickThunk',
  async ({ votingPlayerId, kickedPlayerId, gameId }) => {
    await ApiService.startVotingToKick({
      votingPlayerId,
      kickedPlayerId,
      gameId,
    });
  }
);

export const voteToKickThunk = createAsyncThunk<
  void,
  IClientVoteToKickParameters
>(
  'game/voteToKickThunk',
  async ({ votingPlayerId, kickedPlayerId, gameId, accept }) => {
    await ApiService.voteToKick({
      votingPlayerId,
      kickedPlayerId,
      gameId,
      accept,
    });
  }
);

export const kickPlayerThunk = createAsyncThunk<
  void,
  IClientKickPlayerParameters
>(
  'game/kickPlayerThunk',
  async ({ dealerId, kickedPlayerId, gameId }, thunkApi) => {
    await ApiService.kickPlayer({
      dealerId,
      kickedPlayerId,
      gameId,
    });
    thunkApi.dispatch(gameActions.deletePlayer(kickedPlayerId));
  }
);

export const cancelGameThunk = createAsyncThunk<
  void,
  IClientCancelGameParameters
>('game/cancelGameThunk', async ({ dealerId, gameId }, thunkApi) => {
  await ApiService.cancelGame({ dealerId, gameId });
  thunkApi.dispatch(currentUserActions.changeCurrentUser({ id: '' }));
  thunkApi.dispatch(gameSettingsActions.resetSettings());
  thunkApi.dispatch(gameActions.resetGame());
});

export const scoreIssueThunk = createAsyncThunk<
  void,
  IClientScoreIssueParameters
>('game/scoreIssueThunk', async ({ playerId, issueId, score, gameId }) => {
  await ApiService.scoreIssue({ playerId, issueId, score, gameId });
});

export const finishGameThunk = createAsyncThunk<
  void,
  IClientFinishGameParameters
>('game/finishGameThunk', async ({ dealerId, gameId }, thunkApi) => {
  await ApiService.finishGame({ dealerId, gameId });
  thunkApi.dispatch(currentUserActions.changeCurrentUser({ id: '' }));
  thunkApi.dispatch(gameSettingsActions.resetSettings());
  thunkApi.dispatch(gameActions.resetGame());
});

export const changeCurrentIssueThunk = createAsyncThunk<
  IChangeCurrentIssueResponse,
  IClientChangeCurrentIssueParameters
>(
  'game/changeCurrentIssueThunk',
  async ({ dealerId, issueId, gameId }, thunkApi) => {
    const response = await ApiService.changeCurrentIssue({
      dealerId,
      issueId,
      gameId,
    });
    thunkApi.dispatch(gameActions.changeCurrentIssueId(issueId));
    return response;
  }
);

export const startRoundThunk = createAsyncThunk<
  void,
  IClientStartRoundParameters
>('game/startRoundThunk', async ({ dealerId, issueId, gameId }, thunkApi) => {
  await ApiService.startRound({
    dealerId,
    issueId,
    gameId,
  });
  thunkApi.dispatch(gameActions.changeStatus(TGameStatus.roundInProgress));
});

export const leaveGameThunk = createAsyncThunk<
  void,
  IClientLeaveGameParameters,
  { state: IUser }
>('game/leaveGameThunk', async ({ playerId, gameId }, thunkApi) => {
  await ApiService.leaveGame({
    playerId,
    gameId,
  });
  thunkApi.dispatch(gameActions.resetGame());
  thunkApi.dispatch(gameSettingsActions.resetSettings());
  thunkApi.dispatch(
    currentUserActions.changeCurrentUser({
      id: '',
    })
  );
});

export const thunks = {
  connectThunk,
  createGameThunk,
  addPlayerThunk,
  createIssueThunk,
  updateIssueThunk,
  deleteIssueThunk,
  startGameThunk,
  checkGameThunk,
  cancelGameThunk,
  postMessageThunk,
  scoreIssueThunk,
  finishGameThunk,
  changeCurrentIssueThunk,
  voteToKickThunk,
  startVotingToKickThunk,
  kickPlayerThunk,

  startRoundThunk,
  leaveGameThunk,
};
