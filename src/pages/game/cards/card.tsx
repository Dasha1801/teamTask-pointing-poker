import React from 'react';
import { TCardScore } from '../../../redux/types/card';
import breakImage from '../../../shared/assets/icons/break.svg';
import styles from './card.module.scss';

interface IPlayCardProps {
  mode: string;
  cardValue: TCardScore;
  isSelected: boolean;
  handleClick(): void;
}

function PlayCard({
  cardValue,
  mode,
  isSelected,
  handleClick,
}: React.PropsWithChildren<IPlayCardProps>): JSX.Element {
  return (
    <section
      className={styles.playCard}
      data-rank={cardValue}
      data-mode={mode}
      onClick={handleClick}
    >
      {isSelected && <div className={styles.chosenCardBackground} />}
      <div className={styles.top}>
        {cardValue === 'break' ? (
          <img src={breakImage} alt="Break" width="75%" />
        ) : cardValue === 'unknown' ? (
          '?'
        ) : (
          cardValue
        )}
      </div>
      <div className={styles.center}>
        {cardValue === 'break' ? (
          <img src={breakImage} alt="Break" width="75%" />
        ) : cardValue === 'unknown' ? (
          '?'
        ) : (
          cardValue
        )}
      </div>
      <div className={styles.bottom}>
        {cardValue === 'break' ? (
          <img src={breakImage} alt="Break" width="75%" />
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
