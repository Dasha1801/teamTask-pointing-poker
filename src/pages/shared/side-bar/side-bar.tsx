import React from 'react';
import { useSelector } from 'react-redux';
import { gameSelectors } from '../../../redux/selectors';
import { TGameStatus } from '../../../redux/types';
import Chat from './chat/chat';
import RoundStatus from './round-status/round-status';
import styles from './side-bar.module.scss';

const SideBar = (): JSX.Element => {
  const gameStatus = useSelector(gameSelectors.selectStatus);

  return (
    <div className={styles.container}>
      {gameStatus === TGameStatus.lobby ? <Chat /> : <RoundStatus />}
    </div>
  );
};

export default SideBar;
