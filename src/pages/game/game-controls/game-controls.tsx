import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
  currentUserSelectors,
  gameSelectors,
  gameSettingsSelectors,
} from '../../../redux/selectors';
import { gameActions } from '../../../redux/slices/game/game-slice';
import { thunks } from '../../../redux/thunks/thunks';
import { TGameStatus, TUserRole } from '../../../redux/types';
import { BaseButton } from '../../shared/buttons/base-button/base-button';
import { ButtonBlue } from '../../shared/buttons/button-blue/button-blue';
import Timer from '../timer/timer';
import styles from './game-controls.module.scss';

export default function GameControls(): JSX.Element {
  const currentUser = useSelector(currentUserSelectors.selectCurrentUser);
  const gameId = useSelector(gameSelectors.selectId);
  const gameStatus = useSelector(gameSelectors.selectStatus);
  const currentIssue = useSelector(gameSelectors.selectCurrentIssue);
  const settings = useSelector(gameSettingsSelectors.selectSettings);
  const issues = useSelector(gameSelectors.selectIssues);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleExit = async () => {
    history.push('/');
    await dispatch(thunks.leaveGameThunk({ playerId: currentUser.id, gameId }));
  };

  const handleNextIssue = async () => {
    dispatch(gameActions.getNextIssue());
  };

  const handleStart = async () => {
    if (currentIssue) {
      await dispatch(
        thunks.startRoundThunk({
          dealerId: currentUser.id,
          issueId: currentIssue.id,
          gameId,
        })
      );
    }
  };

  const handleRestart = async () => {
    if (currentIssue) {
      dispatch(
        gameActions.updateIssue({
          issueId: currentIssue.id,
          updatedIssue: { lastRoundResult: {} },
        })
      );
      handleStart();
    }
  };

  const handleStopRound = async () => {
    console.log('stop round');
  };

  const handleFinish = async () => {
    history.push('/results');
    await dispatch(
      thunks.finishGameThunk({ dealerId: currentUser.id, gameId })
    );
  };

  return (
    <div className={styles.gameControls}>
      {settings.timer && (
        <div className={styles.timer}>
          <Timer />
        </div>
      )}
      <div className={styles.buttons}>
        {currentUser.role === TUserRole.dealer ? (
          <>
            <div className={styles.gameButtons}>
              <BaseButton
                disabled={gameStatus !== TGameStatus.started}
                className={styles.button}
                onClick={handleExit}
              >
                Stop Game
              </BaseButton>
              <BaseButton
                disabled={gameStatus !== TGameStatus.started}
                className={styles.button}
                onClick={handleFinish}
              >
                Finish Game
              </BaseButton>
            </div>
            <div className={styles.roundButtons}>
              {(!currentIssue ||
                !Object.keys(currentIssue.lastRoundResult).length) && (
                <ButtonBlue
                  disabled={!currentIssue || gameStatus !== TGameStatus.started}
                  className={styles.button}
                  onClick={handleStart}
                >
                  Start round
                </ButtonBlue>
              )}
              {currentIssue &&
                Object.keys(currentIssue.lastRoundResult).length > 0 && (
                  <ButtonBlue
                    disabled={
                      !currentIssue || gameStatus !== TGameStatus.started
                    }
                    className={styles.button}
                    onClick={handleRestart}
                  >
                    Restart round
                  </ButtonBlue>
                )}
              <ButtonBlue
                disabled={gameStatus !== TGameStatus.roundInProgress}
                className={styles.button}
                onClick={handleStopRound}
              >
                Stop round
              </ButtonBlue>
              <ButtonBlue
                disabled={!issues.length || gameStatus !== TGameStatus.started}
                className={styles.button}
                onClick={handleNextIssue}
              >
                Next issue
              </ButtonBlue>
            </div>
          </>
        ) : (
          <BaseButton className={styles.button} onClick={handleExit}>
            Exit
          </BaseButton>
        )}
      </div>
    </div>
  );
}
