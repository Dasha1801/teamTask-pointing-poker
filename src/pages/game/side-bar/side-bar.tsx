import React from 'react';
import RoundStatus from './round-status/round-status';
import styles from './side-bar.module.scss';

const SideBar = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <RoundStatus />
    </div>
  );
};

export default SideBar;
