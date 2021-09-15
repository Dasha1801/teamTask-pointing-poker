import React from 'react';
import { TUserRole } from '../../../../../redux/types';
import BasePlayerCard, {
  IPlayerCardProps,
} from '../../../player-card/player-card';
import styles from './player-card.module.scss';

const PlayerCard = ({ user }: IPlayerCardProps): JSX.Element => {
  return (
    <BasePlayerCard
      user={user}
      customClass={user.role === TUserRole.dealer ? styles.cardHighlight : ''}
    />
  );
};

export default PlayerCard;
