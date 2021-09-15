import React from 'react';
import { TCardType } from '../../redux/types/card';
import Deck from '../shared/components/cards/deck';
import Spinner from '../shared/components/spinner';

const GameResult = (): JSX.Element => {
  return (
    // <ResaltTitle sprintNum={} issues={} />
    <>
      <Deck typeOfDeck={TCardType.fib} />
      <Spinner />
    </>
  );
};

export default GameResult;

{
  /* <Spinner animation={'grow'} /> */
}
