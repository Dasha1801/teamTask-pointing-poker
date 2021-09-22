import React from 'react';
import { useSelector } from 'react-redux';
import { gameSelectors } from '../../../redux/selectors';
import { IUser } from '../../../redux/types';
import { mockDealer } from '../../../shared/mocks';
import PlayerCard from '../../shared/player-card/player-card';
import styles from './about-dealer.module.scss';

const AboutDealer = (): JSX.Element => {
  const dealer = (useSelector(gameSelectors.selectDealer) ||
    mockDealer) as IUser; // !DEBUG

  return (
    <div className={styles.container}>
      <h4 className={styles.role}>Scrum master:</h4>
      <div className={styles.playersContainer}>
        <PlayerCard user={dealer} isPlayer={false} />
      </div>
    </div>
  );
};

export default AboutDealer;
