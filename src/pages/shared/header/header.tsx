import styles from './header.module.scss';
import React from 'react';
import  logo  from '../../../shared/assets/icons/logo-header.svg';
import  message  from '../../../shared/assets/icons/message.svg';
import { useSelector } from 'react-redux';
import { TGameStatus } from '../../../redux/types';
import { gameSelectors } from '../../../redux/selectors';

const Header = ():JSX.Element => {
  const connectionStatus = useSelector(gameSelectors.selectGame);

  return (
    <header className={styles.header} data-testid='header'>
      <img src={logo} className={styles.logo} alt="logo" />
      {
        connectionStatus.status === TGameStatus.lobby? <img src={message} className={styles.message} alt="message" />: null
      }
    </header>
  );
}

export default Header;
