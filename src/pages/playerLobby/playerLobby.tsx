import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gameSelectors } from '../../redux/selectors';
import { IUser } from '../../redux/types';
import AboutDealer from './aboutDealer/aboutDealer';
import Members from './members/members';
import styles from './playerLobby.module.scss';
import { users as mockUsers, issues as mockIssues } from '../../shared/mocks';
import { gameActions } from '../../redux/slices/game/game-slice';

const PlayerLobby = (): JSX.Element => {
  const dispatch = useDispatch();
  dispatch(gameActions.changePlayers(mockUsers));
  dispatch(gameActions.changeIssues(mockIssues));
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
