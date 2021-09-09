import React from 'react';
import { IUser } from '../../../redux/types';
import DealerCard from '../dealer-card/dealer-card';
import styles from './dealer-section.module.scss';

interface IDealerSectionProps {
  dealer: IUser;
  isCurrentUser: boolean;
  minutes?: number;
  seconds?: number;
}

export default function DealerSection({
  dealer,
  isCurrentUser,
}: IDealerSectionProps): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.dealerSection}>
        <DealerCard dealer={dealer} isCurrentUser={isCurrentUser} />
      </div>
    </div>
  );
}
