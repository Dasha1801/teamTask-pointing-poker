import React from 'react';
import {  useSelector } from 'react-redux';
import { gameSelectors } from '../../redux/selectors';
import { IUser } from '../../redux/types';
import AboutDealer from './aboutDealer/aboutDealer';
import Members from './members/members';
import styles from './playerLobby.module.scss';

const PlayerLobby = (): JSX.Element => {

  const users = useSelector(gameSelectors.selectPlayers);
  const issues = useSelector(gameSelectors.selectIssues);
  const dealer = useSelector(gameSelectors.selectDealer) as IUser;

  return (
    <div className={styles.wrapper}>
      <AboutDealer info={{ dealer, issues }} />
      <Members users={users} />
    </div>
  );
};

export default PlayerLobby;
