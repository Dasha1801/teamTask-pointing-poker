import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiService } from '../../shared/services/api-service';
import {
  IAddPlayerResponse,
  ICheckGameResponse,
  IConnectResponse,
  ICreateGameResponse,
  IPostMessageResponse,
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
  IClientGetNextIssueParameters,
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
  IRequestResult,
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
  const response = await ApiService.createGame({ dealerInfo });
  if (response.message) {
    return response;
  }
  const { gameId, dealerId } = response as ICreateGameResponse;
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
  const response = (await ApiService.addPlayer({
    addedPlayer,
    gameId,
  })) as IAddPlayerResponse;
  if (response.message) {
    return response;
  }
  const { playerId, dealer, messages, issues, players, gameStatus } = response;
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
  Partial<IRequestResult>,
  IClientPostMessageParameters
>('game/postMessageThunk', async ({ message, gameId }, thunkApi) => {
  const response = await ApiService.postMessage({
    message,
    gameId,
  });
  if (response.message) {
    return response;
  }
  const { messageId } = response as IPostMessageResponse;
  const postedMessage = new Message({ ...message, id: messageId });
  thunkApi.dispatch(gameActions.postMessage(postedMessage));
  return { messageId };
});

export const createIssueThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientCreateIssueParameters
>(
  'game/createIssueThunk',
  async ({ dealerId, addedIssue, gameId }, thunkApi) => {
    const response = await ApiService.createIssue({
      dealerId,
      addedIssue,
      gameId,
    });
    if (response.message) {
      return response;
    }
    const createdIssue = new Issue({
      ...addedIssue,
      id: response.issueId,
    }).toObject();
    thunkApi.dispatch(gameActions.createIssue(createdIssue));
    return {};
  }
);

export const updateIssueThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientUpdateIssueParameters
>(
  'game/updateIssueThunk',
  async ({ dealerId, updatedIssue, gameId }, thunkApi) => {
    const response = await ApiService.updateIssue({
      dealerId,
      updatedIssue,
      gameId,
    });
    if (response.message) {
      return response;
    }
    thunkApi.dispatch(
      gameActions.updateIssue({
        issueId: updatedIssue.id,
        updatedIssue: updatedIssue,
      })
    );
    return {};
  }
);

export const deleteIssueThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientDeleteIssueParameters
>(
  'game/deleteIssueThunk',
  async ({ dealerId, deletedIssueId, gameId }, thunkApi) => {
    const response = await ApiService.deleteIssue({
      dealerId,
      deletedIssueId,
      gameId,
    });
    if (response.message) {
      return response;
    }
    thunkApi.dispatch(gameActions.deleteIssue(deletedIssueId));
    return {};
  }
);

export const startGameThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientStartGameParameters
>('game/startGameThunk', async ({ dealerId, settings, gameId }, thunkApi) => {
  const response = await ApiService.startGame({ dealerId, settings, gameId });
  if (response.message) {
    return response;
  }
  thunkApi.dispatch(gameSettingsActions.changeSettings(settings));
  thunkApi.dispatch(gameActions.changeStatus(TGameStatus.started));
  return {};
});

export const startVotingToKickThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientKickPlayerVoteParameters
>(
  'game/startVotingToKickThunk',
  async ({ votingPlayerId, kickedPlayerId, gameId }) => {
    const response = await ApiService.startVotingToKick({
      votingPlayerId,
      kickedPlayerId,
      gameId,
    });
    return response;
  }
);

export const voteToKickThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientVoteToKickParameters
>(
  'game/voteToKickThunk',
  async ({ votingPlayerId, kickedPlayerId, gameId, accept }) => {
    const response = await ApiService.voteToKick({
      votingPlayerId,
      kickedPlayerId,
      gameId,
      accept,
    });
    return response;
  }
);

export const kickPlayerThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientKickPlayerParameters
>(
  'game/kickPlayerThunk',
  async ({ dealerId, kickedPlayerId, gameId }, thunkApi) => {
    const response = await ApiService.kickPlayer({
      dealerId,
      kickedPlayerId,
      gameId,
    });
    if (response.message) {
      return response;
    }
    thunkApi.dispatch(gameActions.deletePlayer(kickedPlayerId));
    return {};
  }
);

export const cancelGameThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientCancelGameParameters
>('game/cancelGameThunk', async ({ dealerId, gameId }, thunkApi) => {
  const response = await ApiService.cancelGame({ dealerId, gameId });
  if (response.message) {
    return response;
  }
  thunkApi.dispatch(currentUserActions.changeCurrentUser({ id: '' }));
  thunkApi.dispatch(gameSettingsActions.resetSettings());
  thunkApi.dispatch(gameActions.resetGame());
  return {};
});

export const scoreIssueThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientScoreIssueParameters
>('game/scoreIssueThunk', async ({ playerId, issueId, score, gameId }) => {
  const response = await ApiService.scoreIssue({
    playerId,
    issueId,
    score,
    gameId,
  });
  return response;
});

export const finishGameThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientFinishGameParameters
>('game/finishGameThunk', async ({ dealerId, gameId }, thunkApi) => {
  const response = await ApiService.finishGame({ dealerId, gameId });
  if (response.message) {
    return response;
  }
  thunkApi.dispatch(currentUserActions.changeCurrentUser({ id: '' }));
  thunkApi.dispatch(gameSettingsActions.resetSettings());
  thunkApi.dispatch(gameActions.resetGame());
  return {};
});

export const getNextIssueThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientGetNextIssueParameters
>('game/changeCurrentIssueThunk', async ({ dealerId, gameId }) => {
  const response = await ApiService.getNextIssue({ dealerId, gameId });
  if (response.message) {
    return response;
  }
  // thunkApi.dispatch(gameActions.changeCurrentIssueId(response.issueId));
  return {};
});

export const changeCurrentIssueThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientChangeCurrentIssueParameters
>(
  'game/changeCurrentIssueThunk',
  async ({ dealerId, issueId, gameId }, thunkApi) => {
    const response = await ApiService.changeCurrentIssue({
      dealerId,
      issueId,
      gameId,
    });
    if (response.message) {
      return response;
    }
    thunkApi.dispatch(gameActions.changeCurrentIssueId(issueId));
    return {};
  }
);

export const startRoundThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientStartRoundParameters
>('game/startRoundThunk', async ({ dealerId, issueId, gameId }, thunkApi) => {
  const response = await ApiService.startRound({
    dealerId,
    issueId,
    gameId,
  });
  if (response) {
    return response;
  }
  thunkApi.dispatch(gameActions.changeStatus(TGameStatus.roundInProgress));
  return {};
});

export const leaveGameThunk = createAsyncThunk<
  Partial<IRequestResult>,
  IClientLeaveGameParameters,
  { state: IUser }
>('game/leaveGameThunk', async ({ playerId, gameId }, thunkApi) => {
  const response = await ApiService.leaveGame({
    playerId,
    gameId,
  });
  if (response.message) {
    return response;
  }
  thunkApi.dispatch(gameActions.resetGame());
  thunkApi.dispatch(gameSettingsActions.resetSettings());
  thunkApi.dispatch(
    currentUserActions.changeCurrentUser({
      id: '',
    })
  );
  return {};
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
  getNextIssueThunk,
  startRoundThunk,
  leaveGameThunk,
};
