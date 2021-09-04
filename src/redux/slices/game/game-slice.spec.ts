import { createAction } from '@reduxjs/toolkit';
import { gameSlice, gameActions } from './game-slice';
import {
  Game,
  IGame,
  TGameStatus,
  Issue,
  TIssueScoreStatistics,
  Message,
} from '../../types';

describe('game slice', () => {
  const initialState: IGame = new Game();

  const message1 = new Message({ id: '', userId: 'userId1', message: 'text' });

  const message2 = new Message({ id: '', userId: 'userId2', message: 'text' });

  const issueStatistics: TIssueScoreStatistics = {
    3: 15.5,
    5: 10,
    unknown: 1,
  };

  const issue1 = new Issue({
    id: 'testId1',
    title: 'testTitle1',
    link: 'testLink1',
    statistics: issueStatistics,
  });

  const issue2 = new Issue({
    id: 'testId2',
    title: 'testTitle2',
    link: 'testLink2',
    statistics: issueStatistics,
  });

  test('should handle initial state', () => {
    expect(gameSlice.reducer(undefined, createAction(''))).toEqual({
      ...initialState,
    });
  });

  test('should handle changeId', () => {
    expect(gameSlice.reducer(undefined, gameActions.changeId('new'))).toEqual({
      ...initialState,
      id: 'new',
    });
  });

  test('should handle changeUserId', () => {
    expect(
      gameSlice.reducer(undefined, gameActions.changeUserId('new'))
    ).toEqual({
      ...initialState,
      userId: 'new',
    });
  });

  test('should handle changeDealerId', () => {
    expect(
      gameSlice.reducer(undefined, gameActions.changeDealerId('new'))
    ).toEqual({
      ...initialState,
      dealerId: 'new',
    });
  });

  test('should handle changeStatus', () => {
    expect(
      gameSlice.reducer(
        undefined,
        gameActions.changeStatus(TGameStatus.roundInProgress)
      )
    ).toEqual({
      ...initialState,
      status: TGameStatus.roundInProgress,
    });
  });

  test('should handle changeCurrentIssueId', () => {
    expect(
      gameSlice.reducer(undefined, gameActions.changeCurrentIssueId('new'))
    ).toEqual({
      ...initialState,
      currentIssueId: 'new',
    });
  });
  test('should handle addIssue', () => {
    const gameState = gameSlice.reducer(
      undefined,
      gameActions.addIssue(issue1)
    );
    expect(gameState.issues).toEqual(
      expect.arrayContaining([expect.objectContaining(issue1)])
    );
    expect(gameState.issues).not.toEqual(
      expect.arrayContaining([expect.objectContaining(issue2)])
    );
  });
  test('should handle updateIssue', () => {
    const gameState = gameSlice.reducer(
      { ...initialState, issues: [issue1] },
      gameActions.updateIssue({ issueId: issue1.id, issue: issue2 })
    );
    expect(gameState.issues).toEqual(
      expect.arrayContaining([expect.objectContaining(issue2)])
    );
    expect(gameState.issues).not.toEqual(
      expect.arrayContaining([expect.objectContaining(issue1)])
    );
  });
  test('should handle postMessage', () => {
    const gameState = gameSlice.reducer(
      undefined,
      gameActions.postMessage(message1)
    );
    expect(gameState.messages).toEqual(
      expect.arrayContaining([expect.objectContaining(message1)])
    );
    expect(gameState.messages).not.toEqual(
      expect.arrayContaining([expect.objectContaining(message2)])
    );
  });
});
