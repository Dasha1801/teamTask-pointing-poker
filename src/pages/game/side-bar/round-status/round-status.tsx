import styles from './round-status.module.scss';
import React from 'react';
import { useSelector } from 'react-redux';
import { gameSelectors } from '../../../../redux/selectors';
import PlayerCard from '../../player-card/player-card';

export default function RoundStatus(): JSX.Element {
  const players = useSelector(gameSelectors.selectPlayers);
  const scores = useSelector(gameSelectors.selectCurrentIssue)?.lastRoundResult;

  return (
    <div className={styles.roundStatus}>
      <div className={styles.scoreItem}>
        <div className={styles.heading}>Scores:</div>
        <div className={styles.heading}>Players:</div>
      </div>

      {players.map((player) => {
        return (
          <div className={styles.scoreItem} key={player.id}>
            <div className={styles.status}>
              {scores?.[player.id] || 'In progress'}
            </div>
            <PlayerCard user={player} customClass={styles.playerCard} />
          </div>
        );
      })}
    </div>
  );
}
