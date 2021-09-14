import styles from './header.module.scss';
import React from 'react';
import logo from '../../../shared/assets/icons/logo-header.svg';
import message from '../../../shared/assets/icons/message.svg';
import { useDispatch, useSelector } from 'react-redux';
import { TGameStatus } from '../../../redux/types';
import { gameSelectors } from '../../../redux/selectors';
import { sideBarActions } from '../../../redux/slices/side-bar/side-bar';

interface IHeaderProps {
  sideBarShow: boolean
}

const Header = ({sideBarShow}:IHeaderProps): JSX.Element => {
  const dispatch = useDispatch();
  const connectionStatus = useSelector(gameSelectors.selectGame).status;
  
  const showSideBar = () => {
    dispatch(sideBarActions.changeShowSideBar(!sideBarShow));
  };
  return (
    <header className={styles.header} data-testid="header">
      <img src={logo} className={styles.logo} alt="logo" />
      {connectionStatus === TGameStatus.lobby ? (
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
