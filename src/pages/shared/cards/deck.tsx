import React, { SyntheticEvent, useState } from 'react';
import { TCardType } from '../../../redux/types/card';
import PlayCard from './card';
import s from './cards.module.scss';
import { deck } from './constants';

const Deck = ({ typeOfDeck }: { typeOfDeck: TCardType }): JSX.Element => {
  const currentDeck = [...deck[typeOfDeck]];
  const [selectedCard, setSelectedCard] = useState<string | undefined>('');

  function handlerClick(event: SyntheticEvent) {
    const card = event.target as HTMLDivElement;
    const prevSelectedCards = document.querySelectorAll('section');
    prevSelectedCards.forEach((element) => {
      element.setAttribute('data-selected', 'no');
    });
    card.closest('section')?.setAttribute('data-selected', 'selected');
    setSelectedCard(card.closest('section')?.dataset.rank);
  }
  return (
    <>
      <div className={s.deck} onClick={handlerClick}>
        {currentDeck.map((card, i) =>
          i === 0 ? (
            <PlayCard
              key={card}
              cardValue={card}
              mode="single"
              selectedCard={selectedCard}
            />
          ) : (
            <PlayCard
              key={card}
              cardValue={card}
              mode="deck"
              selectedCard={selectedCard}
            />
          )
        )}
      </div>
      <div style={{ margin: '50px', fontSize: '24px' }}>{selectedCard}</div>
    </>
  );
};

export default Deck;
