import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gameSelectors } from '../../../redux/selectors';
import { lobbyPageActions } from '../../../redux/slices/lobby-page/lobby-page';
import { TGameStatus } from '../../../redux/types';
import logo from '../../../shared/assets/icons/logo-header.svg';
import message from '../../../shared/assets/icons/message.svg';
import styles from './header.module.scss';

const Header = (): JSX.Element => {
  const dispatch = useDispatch();
  const gameStatus = useSelector(gameSelectors.selectGame).status;

  const showSideBar = () => {
    dispatch(lobbyPageActions.toggleSideBar());
  };

  return (
    <header className={styles.header} data-testid="header">
      <a href="/">
        <img src={logo} className={styles.logo} alt="logo" />
      </a>
      {gameStatus !== TGameStatus.inactive ? (
        <img
          src={message}
          className={styles.message}
          alt="message"
          onClick={showSideBar}
        />
      ) : null}
    </header>
  );
};

export default Header;
