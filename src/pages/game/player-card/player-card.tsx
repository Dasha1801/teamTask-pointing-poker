import styles from './player-card.module.scss';
import React from 'react';
import { IUser } from '../../../redux/types';
import removeUser from '../../../shared/assets/icons/remove-user.svg';

interface IPlayerCardProps {
  user: IUser;
  isCurrentUser: boolean;
  isPlayer: boolean;
}

const PlayerCard = ({
  user,
  isCurrentUser,
  isPlayer,
}: IPlayerCardProps): JSX.Element => {
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
      <div className={styles.info}>
        {isCurrentUser && <div className={styles.currentUser}>It`s you</div>}
        <div className={styles.name}>
          {`${user?.firstName} ${user.lastName || ''}`}
        </div>
        <div className={styles.jobPosition}>{user.jobPosition || ''}</div>
      </div>
      {isPlayer && (
        <div className={styles.remove}>
          <img src={removeUser} className={styles.removeImg} alt="Kick" />
        </div>
      )}
    </div>
  );
};

export default PlayerCard;
