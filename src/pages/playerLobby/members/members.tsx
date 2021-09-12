import styles from './members.module.scss';
import React from 'react';
import { IUser, TUserRole } from '../../../redux/types';
import Player from '../../shared/cardPlayer/cardPlayer';
import { useSelector } from 'react-redux';
import { currentUserSelectors } from '../../../redux/selectors';

interface IUsersProps {
  users: IUser[];
}

const Members = ({ users }: IUsersProps): JSX.Element => {
  const currentUserId = useSelector(currentUserSelectors.selectCurrentUser).id;
  const currentUserRole = useSelector(
    currentUserSelectors.selectCurrentUser
  ).role;

  return (
    <div className={styles.container}>
      <div className={styles.btnWrapper}>
        <button className={styles.btnExit}>Exit</button>
      </div>
      <h2 className={styles.h2}>Members:</h2>
      <div className={styles.playersContainer}>
        {users.map((player) => {
          if (currentUserRole === 'observer') {
            return (
              <Player
                user={player}
                isCurrentUser={player.id === currentUserId}
                isPlayer={false}
              />
            );
          } else if (player.role != TUserRole.dealer) {
            return (
              <Player
                user={player}
                isCurrentUser={player.id === currentUserId}
                isPlayer={true}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default Members;
