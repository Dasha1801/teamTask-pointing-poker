import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  currentUserSelectors,
  gameSelectors,
  gameSettingsSelectors
} from '../../../../redux/selectors';
import { thunks } from '../../../../redux/thunks/thunks';
import { TCardScore } from '../../../../redux/types/card';
import PlayCard from './card';
import CardAdd from './cardAdd';
import styles from './deck.module.scss';

function Deck(): JSX.Element {
  const dispatch = useDispatch();
  const { cardValues } = useSelector(gameSettingsSelectors.selectSettings);
  const gameId = useSelector(gameSelectors.selectId);
  const currentIssueId = useSelector(gameSelectors.selectCurrentIssueId);
  const currentUser = useSelector(currentUserSelectors.selectCurrentUser);
  const currentDeck = cardValues;
  const [selectedCard, setSelectedCard] = useState<TCardScore>(-1);
  const gameStatus = useSelector(gameSelectors.selectGame).status;


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
        {gameStatus === 'lobby' && <CardAdd />}
      </div>
    </>
  );
}

export default Deck;
