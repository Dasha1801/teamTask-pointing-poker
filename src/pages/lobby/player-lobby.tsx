import React from 'react';
import { useSelector } from 'react-redux';
import { gameSelectors } from '../../redux/selectors';
import { lobbyPageSelectors } from '../../redux/selectors/lobby-page-selectors';
import SideBar from '../shared/side-bar/side-bar';
import SprintHeading from '../shared/sprint-heading/sprint-heading';
import AboutDealer from './about-dealer/about-dealer';
import Members from './members/members';
import styles from './player-lobby.module.scss';

const PlayerLobby = (): JSX.Element => {
  const sideBar = useSelector(lobbyPageSelectors.selectIsSideBarShown);
  const users = useSelector(gameSelectors.selectPlayers);
  const messages = useSelector(gameSelectors.selectGame).messages;
  const messagesIds = new Set(messages.map((item) => item.id));
  const issues = useSelector(gameSelectors.selectIssues);

  return (
    <div className={styles.rootContainer}>
      <div className={styles.wrapper}>
        <SprintHeading issues={issues} />
        <AboutDealer />
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
