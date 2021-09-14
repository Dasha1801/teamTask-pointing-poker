import styles from './footer.module.scss';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  currentUserSelectors,
  gameSelectors,
  gameSettingsSelectors,
} from '../../../redux/selectors';
import { IIssue, TGameStatus, TUserRole } from '../../../redux/types';
import { IssueStatistics } from '../../shared/issue-statistics/issue-statistics';

function Cards(): JSX.Element {
  return <div />;
}

export default function Footer(): JSX.Element {
  const currentIssue = useSelector(gameSelectors.selectCurrentIssue) as IIssue;
  const gameStatus = useSelector(gameSelectors.selectStatus);
  const userRole = useSelector(currentUserSelectors.selectCurrentUser).role;
  const canDealerPlay = useSelector(
    gameSettingsSelectors.selectSettings
  ).canDealerPlay;

  return (
    <div className={styles.footer}>
      {gameStatus === TGameStatus.started &&
        Object.keys(currentIssue.lastRoundResult).length && (
          <IssueStatistics issue={currentIssue} />
        )}
      {((userRole === TUserRole.dealer && canDealerPlay) ||
        userRole === TUserRole.player) && <Cards />}
    </div>
  );
}
