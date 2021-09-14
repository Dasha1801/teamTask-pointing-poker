import { gameActions, gameSlice } from '../../redux/slices/game/game-slice';
import { currentUser, dealer, issue } from '../../shared/mocks';
import { render } from '../../shared/test-utils';
import PlayerLobby from './playerLobby';
import React from 'react';
import {
  currentUserActions,
  currentUserSlice,
} from '../../redux/slices/currentUser/current-user-slice';
import { IGame } from '../../redux/types';

describe('render page PlayerLobby', () => {
  let gameState: IGame;
  beforeEach(() => {
    gameState = gameSlice.reducer(
      undefined,
      gameActions.changePlayers([dealer])
    );
  });

  test('should handle dealer', () => {
    const page = render(<PlayerLobby />, {
      preloadedState: { game: gameState },
    });
    page.getByText(`${dealer.firstName} ${dealer.lastName}`);
  });

  test('should handle issue', () => {
    const issueState = gameSlice.reducer(
      undefined,
      gameActions.changeIssues([issue])
    );

    gameState = gameSlice.reducer(
      issueState,
      gameActions.changePlayers([dealer])
    );
    const page = render(<PlayerLobby />, {
      preloadedState: { game: gameState },
    });
    page.getByText(`(issues: ${issue.title}, )`);
  });

  test('should handle currentUser', () => {
    const currentGameState = gameSlice.reducer(
      undefined,
      gameActions.changePlayers([dealer, currentUser])
    );
    const currenUserState = currentUserSlice.reducer(
      undefined,
      currentUserActions.changeCurrentUser(currentUser)
    );
    const page = render(<PlayerLobby />, {
      preloadedState: { currentUser: currenUserState, game: currentGameState },
    });
    page.getByText(`${currentUser.firstName} ${currentUser.lastName}`);
  });
});
