import React, { FormEvent, SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserSelectors, gameSelectors } from '../../../redux/selectors';
import { appActions } from '../../../redux/slices/app/app-slice';
import { AppDispatch } from '../../../redux/store';
import { thunks } from '../../../redux/thunks/thunks';
import {
  IIssue,
  IRequestResult,
  TGameStatus,
  TUserRole,
} from '../../../redux/types';
import {
  InfoMessage,
  TInfoMessageType,
} from '../../../redux/types/info-message';
import ButtonClose from '../../shared/buttons/button-close/button-close';
import styles from './issue-card.module.scss';

interface IIssueCardProps {
  issue: IIssue;
  canEditScore: boolean;
  canRemove: boolean;
  customClass?: string;
}

export default function IssueCard({
  issue,
  canRemove,
  canEditScore,
  customClass,
}: IIssueCardProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const gameId = useSelector(gameSelectors.selectId);
  const gameStatus = useSelector(gameSelectors.selectStatus);
  const currentUser = useSelector(currentUserSelectors.selectCurrentUser);
  const currentIssueId = useSelector(gameSelectors.selectCurrentIssueId);
  const [showScoreInput, setShowScoreInput] = useState(false);
  const [isWithinIssueCard, setIsWithinIssueCard] = useState(false);
  const [isWithinIssueCardInfo, setIsWithinIssueCardInfo] = useState(false);

  const isCurrentIssue = () => {
    return issue.id === currentIssueId;
  };

  const handleClick = async () => {
    if (
      currentUser.role === TUserRole.dealer &&
      !isCurrentIssue() &&
      gameStatus === TGameStatus.started
    ) {
      const response = await dispatch(
        thunks.changeCurrentIssueThunk({
          dealerId: currentUser.id,
          gameId,
          issueId: issue.id,
        })
      );
      const payload = response.payload as Partial<IRequestResult>;
      if (payload.message) {
        dispatch(
          appActions.addOneInfoMessage(
            new InfoMessage(payload.message, TInfoMessageType.error).toObject()
          )
        );
        return;
      }
    }
  };

  const deleteIssue = async () => {
    const response = await dispatch(
      thunks.deleteIssueThunk({
        dealerId: currentUser.id,
        deletedIssueId: issue.id,
        gameId,
      })
    );
    const payload = response.payload as Partial<IRequestResult>;
    if (payload.message) {
      dispatch(
        appActions.addOneInfoMessage(
          new InfoMessage(payload.message, TInfoMessageType.error).toObject()
        )
      );
      return;
    }
  };

  const getIssueScore = (): string => {
    return Object.keys(issue.lastRoundResult).length
      ? String(issue.score)
      : '\u2015';
  };

  const handleScoreInputChange = async (newValue: string) => {
    const numberValue = Number(newValue);
    if (numberValue && numberValue > 0) {
      const response = await dispatch(
        thunks.updateIssueThunk({
          dealerId: currentUser.id,
          gameId,
          updatedIssue: {
            ...issue,
            score: numberValue,
          },
        })
      );
      const payload = response.payload as Partial<IRequestResult>;
      if (payload.message) {
        dispatch(
          appActions.addOneInfoMessage(
            new InfoMessage(payload.message, TInfoMessageType.error).toObject()
          )
        );
        return;
      }
    }
    setShowScoreInput(false);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      scoreInput: { value: string };
    };
    await handleScoreInputChange(target.scoreInput.value);
  };

  const handleChange = async (event: SyntheticEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    await handleScoreInputChange(input.value);
  };

  return (
    <div
      className={`${styles.issueCard} ${
        isCurrentIssue() ? styles.current : ''
      } ${customClass || ''}`}
      onClick={handleClick}
    >
      <div
        className={styles.issueInfo}
        onMouseEnter={() => {
          setIsWithinIssueCard(true);
        }}
        onMouseLeave={() => {
          setIsWithinIssueCard(false);
        }}
      >
        {isCurrentIssue() && (
          <div className={styles.currentStatus}>current</div>
        )}
        <div className={styles.title}>{issue.title}</div>
        <div className={styles.priority}>
          <span className={styles.capitalize}>{issue.priority}</span> priority
        </div>
      </div>

      {gameStatus !== TGameStatus.inactive && (
        <>
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
        </>
      )}
      {canRemove && gameStatus !== TGameStatus.roundInProgress && (
        <div className={styles.buttonCloseContainer}>
          <ButtonClose onClick={deleteIssue} />
        </div>
      )}
      {(isWithinIssueCard || isWithinIssueCardInfo) && (
        <div
          className={styles.infoPopup}
          onMouseEnter={() => {
            setIsWithinIssueCardInfo(true);
          }}
          onMouseLeave={() => {
            setIsWithinIssueCardInfo(false);
          }}
        >
          <div className={styles.infoTitle}>
            <div className={styles.nameInfo}>Title:</div>
            <div className={styles.infoValue}>{issue.title}</div>
          </div>
          <div className={styles.infoLink}>
            <div className={styles.nameInfo}>Link:</div>
            <div className={styles.infoValue}>
              <a href={issue.link}>{issue.link}</a>
            </div>
          </div>
          <div className={styles.infoPriority}>
            <div className={styles.nameInfo}>Priority:</div>
            <div className={styles.infoValue}>{issue.priority}</div>
          </div>
        </div>
      )}
    </div>
  );
}
