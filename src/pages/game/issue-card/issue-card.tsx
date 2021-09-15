import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserSelectors, gameSelectors } from '../../../redux/selectors';
import { thunks } from '../../../redux/thunks/thunks';
import { IIssue, TGameStatus } from '../../../redux/types';
import ButtonClose from '../../shared/buttons/button-close/button-close';
import styles from './issue-card.module.scss';

interface IIssueCardProps {
  issue: IIssue;
  isCurrent?: boolean;
  canEditScore: boolean;
  canRemove: boolean;
  score?: number;
}

export default function IssueCard({
  issue,
  isCurrent = false,
  canRemove,
  canEditScore,
  score = 10,
}: IIssueCardProps): JSX.Element {
  const dispatch = useDispatch();
  const gameStatus = useSelector(gameSelectors.selectStatus);
  const currentUserId = useSelector(currentUserSelectors.selectCurrentUser).id;

  const deleteIssue = async () => {
    await dispatch(
      thunks.deleteIssueThunk({
        dealerId: currentUserId,
        deletedIssueId: issue.id,
      })
    );
  };

  return (
    <div className={`${styles.issueCard} ${isCurrent ? styles.current : ''}`}>
      <div className={styles.issueInfo}>
        {isCurrent && <div className={styles.currentStatus}>current</div>}
        <div className={styles.title}>{issue.title}</div>
        <div className={styles.priority}>
          <span className={styles.capitalize}>{issue.priority}</span> priority
        </div>
      </div>
      {canEditScore && (
        <input
          type="text"
          maxLength={2}
          defaultValue={score}
          className={styles.score}
        />
      )}
      {canRemove && gameStatus !== TGameStatus.roundInProgress && (
        <div className={styles.buttonCloseContainer}>
          <ButtonClose onClick={deleteIssue} />
        </div>
      )}
    </div>
  );
}