import React from 'react';
import { gameActions, gameSlice } from '../../../redux/slices/game/game-slice';
import { IGame } from '../../../redux/types';
import { mockDealer, mockIssue } from '../../../shared/mocks';
import { render } from '../../../shared/test-utils';
import DealerLobby from './dealer-lobby';

describe('render page DealerLobby', () => {
  let gameState: IGame;
  beforeEach(() => {
    gameState = gameSlice.reducer(
      undefined,
      gameActions.changePlayers([mockDealer])
    );
  });

  test('should handle dealer', () => {
    const page = render(<DealerLobby />, {
      preloadedState: { game: gameState },
    });
    page.getByText(`${mockDealer.firstName} ${mockDealer.lastName}`);
  });

  test('should handle issue', () => {
    const issueState = gameSlice.reducer(
      undefined,
      gameActions.changeIssues([mockIssue])
    );

    gameState = gameSlice.reducer(
      issueState,
      gameActions.changePlayers([mockDealer])
    );
    const page = render(<DealerLobby />, {
      preloadedState: { game: gameState },
    });
    page.getByText(`(issues: ${mockIssue.title}, )`);
  });
});
