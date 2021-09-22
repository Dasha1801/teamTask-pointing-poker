import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { IIssue, TIssuePriority } from '../../redux/types';
import { mockLastRoundResult4 } from '../../shared/mocks';
import IssueCard from '../game/issue-card/issue-card';
import GameResult from './game-result';

describe('App component', () => {
  test('Should render component', () => {
    const issue: IIssue = {
      id: '1',
      title: '12345',
      priority: TIssuePriority.high,
      link: '',
      lastRoundResult: mockLastRoundResult4,
    };
    render(
      <Provider store={store}>
        <IssueCard issue={issue} canEditScore={false} canRemove={false} />
      </Provider>
    );
  });
  test('it renders', () => {
    render(
      <Provider store={store}>
        <GameResult />
      </Provider>
    );
    expect(screen.getByText('Sprint planning')).toBeInTheDocument();
  });
});
