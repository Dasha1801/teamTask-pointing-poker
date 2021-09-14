import styles from './dealer-card.module.scss';
import React from 'react';
import { IUser } from '../../../redux/types';
import PlayerCard from '../../game/player-card/player-card';

interface IDealerCardProps {
  dealer: IUser;
  isCurrentUser: boolean;
}

export default function DealerCard({
  dealer,
  isCurrentUser,
}: IDealerCardProps): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.role}>Scrum master:</div>
      <PlayerCard
        user={dealer}
        isCurrentUser={isCurrentUser}
        isPlayer={false}
      />
    </div>
  );
}
