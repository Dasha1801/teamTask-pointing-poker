import React from 'react';
import { store } from '../../../redux/store';
import { Issue, TUserRole, User } from '../../../redux/types';
import { render } from '../../../shared/test-utils';
import { IssueStatistics } from './issue-statistics';

describe('Issue statistics component', () => {
  const issue = new Issue({
    id: 'issueId',
    title: 'issueTitle',
    lastRoundResult: {},
  });
  test('Should render component', () => {
    render(<IssueStatistics issue={issue} />, {
      preloadedState: {
        ...store.getState(),
        currentUser: new User({
          firstName: 'dealerFirstName',
          role: TUserRole.dealer,
        }),
      },
    });
  });
});
