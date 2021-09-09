import React from 'react';
import { useSelector } from 'react-redux';
import { gameSelectors } from '../../../redux/selectors';
import { IUser } from '../../../redux/types';
import { mockDealer } from '../../../shared/mocks';
import PlayerCard from '../../shared/player-card/player-card';
import styles from './about-dealer.module.scss';

const AboutDealer = (): JSX.Element => {
  const issues = useSelector(gameSelectors.selectIssues);
  const dealer = (useSelector(gameSelectors.selectDealer) ||
    mockDealer) as IUser; // !DEBUG

  const getTitleIssue = () => {
    let str = '';
    issues.map((item) => {
      str += `${item.title}, `;
    });
    return str.length < 30 ? str : `${str.slice(0, 29)}...`;
  };

  const title = getTitleIssue();

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        Sprint planning <span className={styles.issues}>(issues: {title})</span>
      </h3>
      <h4 className={styles.role}>Scrum master:</h4>
      <div className={styles.playersContainer}>
        <PlayerCard user={dealer} isPlayer={false} />
      </div>
    </div>
  );
};

export default AboutDealer;
