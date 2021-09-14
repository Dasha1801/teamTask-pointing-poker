import React from 'react';
import { useSelector } from 'react-redux';
import { gameSelectors } from '../../redux/selectors';
import { sideBarSelectors } from '../../redux/selectors/side-bar-selectors';
import { IUser } from '../../redux/types';
import SideBar from '../shared/side-bar/side-bar';
import AboutDealer from './aboutDealer/aboutDealer';
import Members from './members/members';
import styles from './playerLobby.module.scss';

const PlayerLobby = (): JSX.Element => {

  const sideBar = useSelector(sideBarSelectors.selectSideBar).isShowSideBar;
  const users = useSelector(gameSelectors.selectPlayers);
  const issues = useSelector(gameSelectors.selectIssues);
  const dealer = useSelector(gameSelectors.selectDealer) as IUser;
  const messages = useSelector(gameSelectors.selectGame).messages;
  const messagesIds = new Set(messages.map((item) => item.id));

  return (
    <div className={styles.rootContainer}>
      <div className={styles.wrapper}>
        <AboutDealer info={{ dealer, issues }} />
        <Members users={users} />
      </div>
      {sideBar ? (
        <div className={styles.sideBar}>
          <SideBar
            message={{
              messagesProps: messages,
              users: users.filter((user) => messagesIds.has(user.id)),
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default PlayerLobby;
