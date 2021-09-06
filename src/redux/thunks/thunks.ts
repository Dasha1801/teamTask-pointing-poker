import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiService } from '../../shared/services/api-service';
import {
  User,
  IThunkAddPlayerParameters,
  IThunkPostMessageParameters,
  IThunkCreateIssueParameters,
  IThunkDeleteIssueParameters,
  IThunkUpdateIssueParameters,
  IThunkStartGameParameters,
  IThunkCancelGameParameters,
  IThunkScoreIssueParameters,
  IThunkFinishGameParameters,
  IThunkChangeCurrentIssueParameters,
  IThunkKickPlayerVoteParameters,
  IThunkKickPlayerParameters,
  IThunkCheckGameParameters,
  IThunkStartRoundParameters,
  IThunkLeaveGameParameters,
  IThunkCreateGameParameters,
  Message,
  Issue,
  TGameStatus,
  IThunkCreateGameResult,
  IThunkAddPlayerResult,
  IUser,
  TUserRole,
} from '../types';
import {
  ICheckGameResponse,
  IChangeCurrentIssueResponse,
  IConnectResponse,
} from '../../shared/services/types';
import { gameActions } from '../slices/game/game-slice';
import { appActions } from '../slices/app/app-slice';
import { currentUserActions } from '../slices/currentUser/current-user-slice';
import { gameSettingsActions } from '../slices/game-settings/game-settings-slice';

export const connectThunk = createAsyncThunk<IConnectResponse, void>(
  'app/connectThunk',
  async (_, thunkApi) => {
    const response = await ApiService.connect();
    thunkApi.dispatch(
      appActions.changeConnectionStatus(response.connectionStatus)
    );
    return response;
  }
);

export const createGameThunk = createAsyncThunk<
  IThunkCreateGameResult,
  IThunkCreateGameParameters
>('game/createGameThunk', async ({ dealerInfo }, thunkApi) => {
  const response = await ApiService.createGame({ dealerInfo });
  const dealer = new User({
    ...dealerInfo,
    id: response.dealerId,
    role: TUserRole.dealer,
  }).toObject();
  thunkApi.dispatch(currentUserActions.changeCurrentUser(dealer));
  thunkApi.dispatch(gameActions.changeId(response.gameId));
  thunkApi.dispatch(gameActions.changeStatus(TGameStatus.lobby));
  return { dealer };
});

export const addPlayerThunk = createAsyncThunk<
  IThunkAddPlayerResult,
  IThunkAddPlayerParameters
>('game/addPlayerThunk', async ({ addedPlayer }, thunkApi) => {
  const { gameId, playerId, dealer, messages, issues, players } =
    await ApiService.addPlayer({
      addedPlayer,
    });
  const player = new User({ ...addedPlayer, id: playerId }).toObject();
  thunkApi.dispatch(gameActions.changeMessages(messages));
  thunkApi.dispatch(gameActions.changeIssues(issues));
  thunkApi.dispatch(gameActions.changePlayers(players.concat(player)));
  thunkApi.dispatch(currentUserActions.changeCurrentUser(player));
  thunkApi.dispatch(gameActions.changeId(gameId));
  return { gameId, dealer, player };
});

export const checkGameThunk = createAsyncThunk<
  ICheckGameResponse,
  IThunkCheckGameParameters
>('game/checkGameThunk', async ({ gameId }) => {
  const response = await ApiService.checkGame({ gameId });
  return response;
});

export const postMessageThunk = createAsyncThunk<
  void,
  IThunkPostMessageParameters
>('game/postMessageThunk', async ({ playerId, message }, thunkApi) => {
  const { messageId } = await ApiService.postMessage({ playerId, message });
  const postedMessage = new Message({ ...message, id: messageId }).toObject();
  thunkApi.dispatch(gameActions.postMessage(postedMessage));
});

export const createIssueThunk = createAsyncThunk<
  void,
  IThunkCreateIssueParameters
>('game/createIssueThunk', async ({ dealerId, issue }, thunkApi) => {
  const { issueId } = await ApiService.createIssue({ dealerId, issue });
  const createdIssue = new Issue({ ...issue, id: issueId }).toObject();
  thunkApi.dispatch(gameActions.createIssue(createdIssue));
});

export const updateIssueThunk = createAsyncThunk<
  void,
  IThunkUpdateIssueParameters
>('game/updateIssueThunk', async ({ dealerId, updatedIssue }, thunkApi) => {
  const response = await ApiService.updateIssue({ dealerId, updatedIssue });
  thunkApi.dispatch(
    gameActions.updateIssue({
      issueId: response.issueId,
      issue: updatedIssue,
    })
  );
});

export const deleteIssueThunk = createAsyncThunk<
  void,
  IThunkDeleteIssueParameters
>('game/deleteIssueThunk', async ({ dealerId, deletedIssueId }, thunkApi) => {
  await ApiService.deleteIssue({ dealerId, deletedIssueId });
  thunkApi.dispatch(gameActions.deleteIssue(deletedIssueId));
});

export const startGameThunk = createAsyncThunk<void, IThunkStartGameParameters>(
  'game/startGameThunk',
  async ({ settings }, thunkApi) => {
    await ApiService.startGame({ settings });
    thunkApi.dispatch(gameSettingsActions.changeSettings(settings));
    thunkApi.dispatch(gameActions.changeStatus(TGameStatus.started));
  }
);

export const kickPlayerVoteThunk = createAsyncThunk<
  void,
  IThunkKickPlayerVoteParameters
>('game/kickPlayerVoteThunk', async ({ votingPlayerId, kickedPlayerId }) => {
  await ApiService.kickPlayerVote({
    votingPlayerId,
    kickedPlayerId,
  });
});

export const kickPlayerThunk = createAsyncThunk<
  void,
  IThunkKickPlayerParameters
>('game/kickPlayerThunk', async ({ dealerId, kickedPlayerId }, thunkApi) => {
  await ApiService.kickPlayer({
    dealerId,
    kickedPlayerId,
  });
  thunkApi.dispatch(gameActions.deletePlayer(kickedPlayerId));
});

export const cancelGameThunk = createAsyncThunk<
  void,
  IThunkCancelGameParameters
>('game/cancelGameThunk', async ({ dealerId }, thunkApi) => {
  await ApiService.cancelGame({ dealerId });
  thunkApi.dispatch(currentUserActions.changeCurrentUser({ id: '' }));
  thunkApi.dispatch(gameSettingsActions.resetSettings());
  thunkApi.dispatch(gameActions.resetGame());
});

export const scoreIssueThunk = createAsyncThunk<
  void,
  IThunkScoreIssueParameters
>('game/scoreIssueThunk', async ({ playerId, issueId, score }) => {
  await ApiService.scoreIssue({ playerId, issueId, score });
});

export const finishGameThunk = createAsyncThunk<
  void,
  IThunkFinishGameParameters
>('game/finishGameThunk', async ({ dealerId }, thunkApi) => {
  await ApiService.finishGame({ dealerId });
  thunkApi.dispatch(currentUserActions.changeCurrentUser({ id: '' }));
  thunkApi.dispatch(gameSettingsActions.resetSettings());
  thunkApi.dispatch(gameActions.resetGame());
});

export const changeCurrentIssueThunk = createAsyncThunk<
  IChangeCurrentIssueResponse,
  IThunkChangeCurrentIssueParameters
>('game/changeCurrentIssueThunk', async ({ dealerId, issueId }, thunkApi) => {
  const response = await ApiService.changeCurrentIssue({ dealerId, issueId });
  thunkApi.dispatch(gameActions.changeCurrentIssueId(issueId));
  return response;
});

export const startRoundThunk = createAsyncThunk<
  void,
  IThunkStartRoundParameters
>('game/startRoundThunk', async ({ dealerId, issueId }, thunkApi) => {
  await ApiService.startRound({
    dealerId,
    issueId,
  });
  thunkApi.dispatch(gameActions.changeStatus(TGameStatus.roundInProgress));
});

export const leaveGameThunk = createAsyncThunk<
  void,
  IThunkLeaveGameParameters,
  { state: IUser }
>('game/leaveGameThunk', async ({ playerId }, thunkApi) => {
  await ApiService.leaveGame({
    playerId,
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
  kickPlayerVoteThunk,
  kickPlayerThunk,
  startRoundThunk,
  leaveGameThunk,
};
