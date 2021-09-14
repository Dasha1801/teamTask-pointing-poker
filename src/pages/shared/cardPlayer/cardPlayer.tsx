import styles from './cardPlayer.module.scss';
import React from 'react';
import { IUser } from '../../../redux/types';
import removeUser from '../../../shared/assets/icons/remove-user.svg';

interface IPlayerProps {
  user: IUser;
  isCurrentUser: boolean;
  isPlayer: boolean;
  className?: string
}

const Player = ({
  user,
  isCurrentUser,
  isPlayer,
}: IPlayerProps): JSX.Element => {
  const name = (a: string, b: string | undefined): string => {
    let str = '';
    str += a.slice(0, 1);
    if (b != undefined) {
      str += b.slice(0, 1);
    }
    return str;
  };

  return (
    <div className={styles.card}>
      {user?.image ? (
        <img className={styles.img} src={user?.image}></img>
      ) : (
        <div className={styles.avatar}>
          {name(user.firstName, user?.lastName)}
        </div>
      )}
      <div className={styles.name}>
        {isCurrentUser && <h6 className={styles.currentUser}>It`s you</h6>}
        <h5 className={styles.h5}>
          {user?.firstName} {user?.lastName}
        </h5>
        <h6 className={styles.h6}>{user?.jobPosition}</h6>
      </div>
      {isPlayer && (
        <div className={styles.remove}>
          <img src={removeUser} className={styles.removeImg} alt="Name" />
        </div>
      )}
    </div>
  );
};

export default Player;
