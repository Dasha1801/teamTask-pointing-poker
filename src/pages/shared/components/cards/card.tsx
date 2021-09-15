import React, { useEffect } from 'react';
import { TCardScore } from '../../../../redux/types/card';
import breakImage from '../../../../shared/assets/icons/break.svg';
import s from './cards.module.scss';
import ChoosenCard from './choosen';

interface IPlayCardProps {
  cardValue: TCardScore;
  mode: string;
  selectedCard: string | undefined;
}

function PlayCard(props: React.PropsWithChildren<IPlayCardProps>): JSX.Element {
  const { cardValue, mode, selectedCard } = props;
  useEffect(() => {}, [selectedCard]);
  return (
    <section className={s.playCard} data-rank={cardValue} data-mode={mode}>
      {cardValue.toString() === selectedCard && <ChoosenCard />}
      <div className={s.top}>
        {cardValue === 'break' ? (
          <img src={breakImage} alt="" width="75%" />
        ) : cardValue === 'unknown' ? (
          '?'
        ) : (
          cardValue
        )}
      </div>
      <div className={s.center}>
        {cardValue === 'break' ? (
          <img src={breakImage} alt="" width="75%" />
        ) : cardValue === 'unknown' ? (
          '?'
        ) : (
          cardValue
        )}
      </div>
      <div className={s.bottom}>
        {cardValue === 'break' ? (
          <img src={breakImage} alt="" width="75%" />
        ) : cardValue === 'unknown' ? (
          '?'
        ) : (
          cardValue
        )}
      </div>
    </section>
  );
}

export default PlayCard;
