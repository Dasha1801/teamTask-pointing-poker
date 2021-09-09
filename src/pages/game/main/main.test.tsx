import { render } from '../../../shared/test-utils';
import React from 'react';
import Main from './main';

describe('Main component', () => {
  test('Should render component', () => {
    render(<Main players={[]} />);
  });
});
