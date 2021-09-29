import React, { FormEvent, SyntheticEvent, useState } from 'react';
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
}

export default function IssueCard({
  issue,
  isCurrent = false,
  canRemove,
  canEditScore,
}: IIssueCardProps): JSX.Element {
  const dispatch = useDispatch();
  const gameId = useSelector(gameSelectors.selectId);
  const gameStatus = useSelector(gameSelectors.selectStatus);
  const currentUserId = useSelector(currentUserSelectors.selectCurrentUser).id;
  const [showScoreInput, setShowScoreInput] = useState(false);

  const deleteIssue = async () => {
    await dispatch(
      thunks.deleteIssueThunk({
        dealerId: currentUserId,
        deletedIssueId: issue.id,
        gameId,
      })
    );
  };

  const getIssueScore = (): string => {
    return Object.keys(issue.lastRoundResult).length
      ? String(issue.score)
      : '⸺';
  };

  const handleScoreInputChange = async (newValue: string) => {
    const numberValue = Number(newValue);
    if (numberValue && numberValue > 0) {
      await dispatch(
        thunks.updateIssueThunk({
          dealerId: currentUserId,
          gameId,
          updatedIssue: {
            ...issue,
            score: numberValue,
          },
        })
      );
    }
    setShowScoreInput(false);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      scoreInput: { value: string };
    };
    console.log('target', target);

    await handleScoreInputChange(target.scoreInput.value);
  };

  const handleChange = async (event: SyntheticEvent<HTMLInputElement>) => {
    // const lastValue = issue.lastRoundResult;
    console.log('change', event);
    const input = event.target as HTMLInputElement;
    await handleScoreInputChange(input.value);
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
      {!showScoreInput ? (
        <span
          onClick={canEditScore ? () => setShowScoreInput(true) : undefined}
          className={styles.score}
        >
          {getIssueScore()}
        </span>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="scoreInput"
            maxLength={2}
            autoFocus
            onBlur={handleChange}
            className={styles.score}
          />
        </form>
      )}
      {canRemove && gameStatus !== TGameStatus.roundInProgress && (
        <div className={styles.buttonCloseContainer}>
          <ButtonClose onClick={deleteIssue} />
        </div>
      )}
    </div>
  );
}
