import styles from './header.module.scss';
import React from 'react';
import logo from '../../../shared/assets/icons/logo-header.svg';
import message from '../../../shared/assets/icons/message.svg';
import { useDispatch, useSelector } from 'react-redux';
import { TGameStatus } from '../../../redux/types';
import { gameSelectors } from '../../../redux/selectors';
import { lobbyPageActions } from '../../../redux/slices/lobby-page/lobby-page';

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
