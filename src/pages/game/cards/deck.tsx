import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserSelectors, gameSelectors } from '../../../redux/selectors';
import { thunks } from '../../../redux/thunks/thunks';
import { TCardScore, TCardType } from '../../../redux/types/card';
import PlayCard from './card';
import { deck } from './constants';
import styles from './deck.module.scss';

interface IDeckProps {
  typeOfDeck: TCardType;
  numberOfCards?: number;
}

function Deck({ typeOfDeck, numberOfCards = 8 }: IDeckProps): JSX.Element {
  const dispatch = useDispatch();
  const gameId = useSelector(gameSelectors.selectId);
  const currentIssueId = useSelector(gameSelectors.selectCurrentIssueId);
  const currentUser = useSelector(currentUserSelectors.selectCurrentUser);
  const currentDeck = [...deck[typeOfDeck].slice(0, numberOfCards)];
  const [selectedCard, setSelectedCard] = useState<TCardScore>(-1);

  async function handleClick(cardValue: TCardScore) {
    setSelectedCard(cardValue);
    await dispatch(
      thunks.scoreIssueThunk({
        issueId: currentIssueId,
        playerId: currentUser.id,
        score: cardValue,
        gameId,
      })
    );
  }
  return (
    <>
      <div className={styles.deck}>
        {currentDeck.map((cardValue, i) =>
          i === 0 ? (
            <PlayCard
              key={cardValue}
              cardValue={cardValue}
              mode="single"
              isSelected={selectedCard === cardValue}
              handleClick={() => handleClick(cardValue)}
            />
          ) : (
            <PlayCard
              key={cardValue}
              cardValue={cardValue}
              mode="deck"
              isSelected={selectedCard === cardValue}
              handleClick={() => handleClick(cardValue)}
            />
          )
        )}
      </div>
    </>
  );
}

export default Deck;
