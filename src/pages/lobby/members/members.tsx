import React from 'react';
import { IUser, TUserRole } from '../../../redux/types';
import PlayerCard from '../../game/player-card/player-card';
import styles from './members.module.scss';

interface IUsersProps {
  users: IUser[];
}

const Members = ({ users }: IUsersProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>Members:</h2>
      <div className={styles.playersContainer}>
        {users.map((player) => {
          return (
            player.role !== TUserRole.dealer && (
              <PlayerCard key={player.id} user={player} />
            )
          );
        })}
      </div>
    </div>
  );
};

export default Members;
