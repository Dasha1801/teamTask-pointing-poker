import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import {
  IGame,
  IGameSettings,
  IIssue,
  IIssueScorePayload,
  IIssueUpdatePayload,
  IMessage,
  IUser,
  TGameStatus,
} from './types';
import { IApp } from './types/app';

const changeId: CaseReducer<IGame, PayloadAction<string>> = (state, action) => {
  state.id = action.payload;
};

const changeUserId: CaseReducer<IGame, PayloadAction<string>> = (
  state,
  action
) => {
  state.userId = action.payload;
};
const changeDealerId: CaseReducer<IGame, PayloadAction<string>> = (
  state,
  action
) => {
  state.dealerId = action.payload;
};
const changeCurrentIssueId: CaseReducer<IGame, PayloadAction<string>> = (
  state,
  action
) => {
  state.currentIssueId = action.payload;
};
const changeSettings: CaseReducer<IGame, PayloadAction<IGameSettings>> = (
  state,
  action
) => {
  state.settings = action.payload;
};
const changeStatus: CaseReducer<IGame, PayloadAction<TGameStatus>> = (
  state,
  action
) => {
  state.status = action.payload;
};
const changeCurrentRoundResults: CaseReducer<
  IGame,
  PayloadAction<IIssueScorePayload>
> = (state, action) => {
  state.currentRoundResults[action.payload.issueId] = action.payload.score;
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
const addIssue: CaseReducer<IGame, PayloadAction<IIssue>> = (state, action) => {
  state.issues.push(action.payload);
};
const updateIssue: CaseReducer<IGame, PayloadAction<IIssueUpdatePayload>> = (
  state,
  action
) => {
  const issueIndex = state.issues.findIndex(
    (issue) => issue.id === action.payload.issueId
  );
  if (issueIndex < 0) {
    throw Error('Issue not found');
  }
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

export const gameReducers = {
  changeId,
  changeUserId,
  changeDealerId,
  changeCurrentIssueId,
  changeSettings,
  changeStatus,
  changeCurrentRoundResults,
  addPlayer,
  deletePlayer,
  addIssue,
  updateIssue,
  deleteIssue,
  postMessage,
};

const changeConnectionStatus: CaseReducer<IApp, PayloadAction<boolean>> = (
  state,
  action
) => {
  state.isConnected = action.payload;
};

export const appReducers = {
  changeConnectionStatus,
};
