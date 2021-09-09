import React from 'react';
import { User } from '../../../redux/types';
import { render } from '../../../shared/test-utils';
import { PlayersList } from './players-list';

describe('PlayersList', () => {
  test('Should render component', () => {
    const { getByText } = render(
      <PlayersList
        players={[
          new User({ id: '1', firstName: 'First', lastName: 'Last' }),
          new User({ id: '2', firstName: 'First1' }),
        ]}
      />
    );
    getByText(/First Last/i);
    getByText(/First1/i);
  });
});
