import React from 'react';
import { useSelector } from 'react-redux';
import { currentUserSelectors } from '../../../redux/selectors';
import { IUser, TUserRole } from '../../../redux/types';
import removeUser from '../../../shared/assets/icons/remove-user.svg';
import styles from './player-card.module.scss';

export interface IPlayerCardProps {
  user: IUser;
  customClass?: string;
}

const PlayerCard = ({ user, customClass }: IPlayerCardProps): JSX.Element => {
  const currentUser = useSelector(currentUserSelectors.selectCurrentUser);
  const canRemove =
    currentUser.role !== TUserRole.observer &&
    user.role !== TUserRole.dealer &&
    user.id !== currentUser.id;

  const name = (a: string, b: string | undefined): string => {
    let str = '';
    str += a.slice(0, 1);
    if (b != undefined) {
      str += b.slice(0, 1);
    }
    return str;
  };

  return (
    <div className={`${styles.card} ${customClass || ''}`}>
      <div className={styles.avatarContainer}>
        {user?.image ? (
          <img className={styles.img} src={user?.image}></img>
        ) : (
          <div className={styles.avatar}>
            {name(user.firstName, user?.lastName)}
          </div>
        )}
      </div>
      <div className={styles.info}>
        {user.id === currentUser.id && (
          <div className={styles.currentUser}>It`s you</div>
        )}
        <div className={styles.name}>
          {`${user?.firstName} ${user.lastName || ''}`}
        </div>
        <div className={styles.jobPosition}>{user.jobPosition || ''}</div>
      </div>
      {canRemove && (
        <div className={styles.remove}>
          <img src={removeUser} className={styles.removeImg} alt="Kick" />
        </div>
      )}
    </div>
  );
};

export default PlayerCard;
