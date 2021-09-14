import React from 'react';
import { useSelector } from 'react-redux';
import { currentUserSelectors } from '../../../redux/selectors';
import { IUser, TUserRole } from '../../../redux/types';
import PlayerCard from '../../shared/player-card/player-card';
import styles from './members.module.scss';

interface IUsersProps {
  users: IUser[];
}

const Members = ({ users }: IUsersProps): JSX.Element => {
  const currentUserRole = useSelector(
    currentUserSelectors.selectCurrentUser
  ).role;

  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>Members:</h2>
      <div className={styles.playersContainer}>
        {users.map((player) => {
          return (
            player.role !== TUserRole.dealer && (
              <PlayerCard
                key={player.id}
                user={player}
                isPlayer={!(currentUserRole === TUserRole.observer)}
              />
            )
          );
        })}
      </div>
    </div>
  );
};

export default Members;
