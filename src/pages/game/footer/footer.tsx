import React from 'react';
import { useSelector } from 'react-redux';
import {
  currentUserSelectors,
  gameSettingsSelectors,
} from '../../../redux/selectors';
import { TUserRole } from '../../../redux/types';
import styles from './footer.module.scss';

function Cards(): JSX.Element {
  return <div />;
}

export default function Footer(): JSX.Element {
  const userRole = useSelector(currentUserSelectors.selectCurrentUser).role;
  const canDealerPlay = useSelector(
    gameSettingsSelectors.selectSettings
  ).canDealerPlay;

  return (
    <div className={styles.footer}>
      {((userRole === TUserRole.dealer && canDealerPlay) ||
        userRole === TUserRole.player) && <Cards />}
    </div>
  );
}
