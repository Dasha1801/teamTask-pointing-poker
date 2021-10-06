import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { gameSelectors } from '../../../redux/selectors';
import { gamePageActions } from '../../../redux/slices/game-page/game-page';
import { lobbyPageActions } from '../../../redux/slices/lobby-page/lobby-page';
import { TGameStatus } from '../../../redux/types';
import logo from '../../../shared/assets/icons/logo-header.svg';
import message from '../../../shared/assets/icons/message.svg';
import sidebar from '../../../shared/assets/icons/sidebar.svg';
import styles from './header.module.scss';

const Header = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const gameStatus = useSelector(gameSelectors.selectGame).status;

  const showSideBar = () => {
    const path = history.location.pathname.match(/(?<=\/).+?(?=\/)/)?.[0] || '';
    if (path === 'lobby') {
      dispatch(lobbyPageActions.toggleSideBar());
    } else if (path === 'game') {
      dispatch(gamePageActions.toggleSideBar());
    }
  };

  const generateHeaderIcon = (): JSX.Element => {
    let src = '';
    if (gameStatus === TGameStatus.lobby) {
      src = message;
    } else if (gameStatus !== TGameStatus.inactive) {
      src = sidebar;
    }
    return (
      <img
        src={src}
        className={styles.showSidebar}
        alt="Show sidebar"
        title="Show sidebar"
        onClick={showSideBar}
      />
    );
  };

  return (
    <header className={styles.header} data-testid="header">
      <a href="/">
        <img
          src={logo}
          className={styles.logo}
          alt="logo"
          title="Go to start page"
        />
      </a>
      {gameStatus !== TGameStatus.inactive && generateHeaderIcon()}
    </header>
  );
};

export default Header;
