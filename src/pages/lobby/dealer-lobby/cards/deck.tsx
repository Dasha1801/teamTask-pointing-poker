import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  currentUserSelectors,
  gameSelectors,
  gameSettingsSelectors,
} from '../../../../redux/selectors';
import { appActions } from '../../../../redux/slices/app/app-slice';
import { AppDispatch } from '../../../../redux/store';
import { thunks } from '../../../../redux/thunks/thunks';
import { IRequestResult } from '../../../../redux/types';
import { TCardScore } from '../../../../redux/types/card';
import {
  InfoMessage,
  TInfoMessageType,
} from '../../../../redux/types/info-message';
import PlayCard from './card';
import CardAdd from './cardAdd';
import styles from './deck.module.scss';

function Deck(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { cardValues } = useSelector(gameSettingsSelectors.selectSettings);
  const gameId = useSelector(gameSelectors.selectId);
  const currentIssueId = useSelector(gameSelectors.selectCurrentIssueId);
  const currentUser = useSelector(currentUserSelectors.selectCurrentUser);
  const currentDeck = cardValues;
  const [selectedCard, setSelectedCard] = useState<TCardScore>(-1);
  const gameStatus = useSelector(gameSelectors.selectGame).status;

  async function handleClick(cardValue: TCardScore) {
    setSelectedCard(cardValue);
    const response = await dispatch(
      thunks.scoreIssueThunk({
        issueId: currentIssueId,
        playerId: currentUser.id,
        score: cardValue,
        gameId,
      })
    );
    const payload = response.payload as Partial<IRequestResult>;
    if (payload.message) {
      dispatch(
        appActions.addOneInfoMessage(
          new InfoMessage(payload.message, TInfoMessageType.error).toObject()
        )
      );
      return;
    }
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
