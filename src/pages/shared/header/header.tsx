import styles from './header.module.scss';
import React from 'react';
import  logo  from '../../../shared/assets/icons/logo-header.svg';
import  message  from '../../../shared/assets/icons/message.svg';


const Header = ():JSX.Element => {
  return (
    <header className={styles.header} data-testid='header'>
      <img src={logo} className={styles.logo} alt="" />
      <img src={message} className={styles.message} alt="" />
    </header>
  );
}

export default Header;