import { CaseReducer, PayloadAction, AnyAction } from '@reduxjs/toolkit';
import {
  IGame,
  IIssue,
  IIssueUpdatePayload,
  IMessage,
  IUser,
  TGameStatus,
  Game,
  IIssueScorePayload,
} from '../types';

const changeId: CaseReducer<IGame, PayloadAction<string>> = (state, action) => {
  state.id = action.payload;
};

const resetGame: CaseReducer<IGame, AnyAction> = (state) => {
  Object.assign(state, new Game({ status: TGameStatus.inactive }).toObject());
};

const changeCurrentIssueId: CaseReducer<IGame, PayloadAction<string>> = (
  state,
  action
) => {
  state.currentIssueId = action.payload;
};

const changeStatus: CaseReducer<IGame, PayloadAction<TGameStatus>> = (
  state,
  action
) => {
  state.status = action.payload;
};

const addPlayer: CaseReducer<IGame, PayloadAction<IUser>> = (state, action) => {
  state.players.push(action.payload);
};

const deletePlayer: CaseReducer<IGame, PayloadAction<string>> = (
  state,
  action
) => {
  state.players = state.players.filter(
    (player) => player.id !== action.payload
  );
};

const postMessage: CaseReducer<IGame, PayloadAction<IMessage>> = (
  state,
  action
) => {
  state.messages.push(action.payload);
};

const createIssue: CaseReducer<IGame, PayloadAction<IIssue>> = (
  state,
  action
) => {
  state.issues.push(action.payload);
};

const scoreIssue: CaseReducer<IGame, PayloadAction<IIssueScorePayload>> = (
  state,
  action
) => {
  const issueIndex = state.issues.findIndex(
    (issue) => issue.id === action.payload.issueId
  );
  const scoredIssue = state.issues[issueIndex];
  const updatedRoundResult = {
    ...scoredIssue.lastRoundResult,
    [action.payload.playerId]: action.payload.score,
  };
  const updated = { ...scoredIssue, lastRoundResult: updatedRoundResult };
  state.issues[issueIndex] = updated;
};

const updateIssue: CaseReducer<IGame, PayloadAction<IIssueUpdatePayload>> = (
  state,
  action
) => {
  const issueIndex = state.issues.findIndex(
    (issue) => issue.id === action.payload.issueId
  );
  const updated = Object.assign(
    { ...state.issues[issueIndex] },
    action.payload.issue
  );
  state.issues[issueIndex] = updated;
};

const deleteIssue: CaseReducer<IGame, PayloadAction<string>> = (
  state,
  action
) => {
  state.issues = state.issues.filter((issue) => issue.id !== action.payload);
};

const changeIssues: CaseReducer<IGame, PayloadAction<IIssue[]>> = (
  state,
  action
) => {
  state.issues = action.payload;
};

const changePlayers: CaseReducer<IGame, PayloadAction<IUser[]>> = (
  state,
  action
) => {
  state.players = action.payload;
};

const changeMessages: CaseReducer<IGame, PayloadAction<IMessage[]>> = (
  state,
  action
) => {
  state.messages = action.payload;
};

export const gameReducers = {
  changeId,
  changeCurrentIssueId,
  changeStatus,
  addPlayer,
  deletePlayer,
  createIssue,
  updateIssue,
  deleteIssue,
  scoreIssue,
  postMessage,
  changeIssues,
  changePlayers,
  changeMessages,
  resetGame,
};