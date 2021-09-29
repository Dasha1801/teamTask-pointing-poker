import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
  currentUserSelectors,
  gamePageSelectors,
  gameSelectors,
  gameSettingsSelectors
} from '../../../redux/selectors';
import { entryRequestSelectors } from '../../../redux/selectors/entry-request-selectors';
import { entryRequestActions } from '../../../redux/slices/entry-request/entry-request';
import { gamePageActions } from '../../../redux/slices/game-page/game-page';
import { gameActions } from '../../../redux/slices/game/game-slice';
import { thunks } from '../../../redux/thunks/thunks';
import { IUser, TCardType, TGameStatus } from '../../../redux/types';
import { BasePopup } from '../../shared/base-popup/base-popup';
import DealerSection from '../../shared/dealer-section/dealer-section';
import { IssueStatistics } from '../../shared/issue-statistics/issue-statistics';
import SprintHeading from '../../shared/sprint-heading/sprint-heading';
import Deck from '../cards/deck';
import GameControls from '../game-controls/game-controls';
import SideBar from '../side-bar/side-bar';
import styles from './game-page.module.scss';

export function GamePage(): JSX.Element {
  const history = useHistory();
  const dispatch = useDispatch();
  const isSideBarShown = useSelector(gamePageSelectors.selectIsSideBarShown);
  const gameStatus = useSelector(gameSelectors.selectStatus);
  const gameId = useSelector(gameSelectors.selectId);
  const [lastGameStatus, setLastGameStatus] = useState(gameStatus);
  const issues = useSelector(gameSelectors.selectIssues);
  const dealer = useSelector(gameSelectors.selectDealer) as IUser;
  const currentIssue = useSelector(gameSelectors.selectCurrentIssue);
  const timer = useSelector(gamePageSelectors.selectTimer);
  const gameSettings = useSelector(gameSettingsSelectors.selectSettings);
  const currentUser = useSelector(currentUserSelectors.selectCurrentUser);
  const entryRequest = useSelector(entryRequestSelectors.selectRequest);
  const [showRoundResult, setShowRoundResult] = useState(false);

  useEffect(() => {
    console.log('req', entryRequest);
    console.log('sidebar', isSideBarShown);
  }, [entryRequest]);

  useEffect(() => {
    (async () => {
      if (gameSettings.timer && !timer.minutes && !timer.seconds) {
        dispatch(gameActions.changeStatus(TGameStatus.started));
        dispatch(
          gamePageActions.changeTimer({
            minutes: gameSettings.timer.minutes,
            seconds: gameSettings.timer.seconds,
          })
        );
        await dispatch(
          thunks.getNextIssueThunk({ dealerId: currentUser.id, gameId })
        );
      }
    })();
  }, [timer]);

  useEffect(() => {
    // if (currentUser.role !== TUserRole.dealer) {
    switch (gameStatus) {
      case TGameStatus.inactive:
        history.push('/');
        break;
      case TGameStatus.started:
        if (lastGameStatus === TGameStatus.roundInProgress) {
          setLastGameStatus(TGameStatus.started);
          setShowRoundResult(true);
        }
        break;
      case TGameStatus.roundInProgress:
        setShowRoundResult(false);
        break;
      default:
        break;
    }
    // }
  }, [gameStatus]);

  return (
    <div className={styles.container}>
      {entryRequest.isEntryRequested && (
        <BasePopup
          buttonOkText="Admit"
          buttonCancelText="Reject"
          buttonCancelProps={{
            onClick: async () => {
              await dispatch(thunks.rejectPlayerThunk({ gameId }));
              dispatch(entryRequestActions.resetEntryRequest());
            },
          }}
          buttonOkProps={{
            onClick: async () => {
              await dispatch(thunks.admitPlayerThunk({ gameId }));
              dispatch(entryRequestActions.resetEntryRequest());
            },
          }}
        >
          {`Admit ${entryRequest.playerInfo.firstName}?`}
        </BasePopup>
      )}
      {gameStatus !== TGameStatus.inactive && (
        <div
          className={`${styles.content} ${
            isSideBarShown ? styles.contentWithSidebar : ''
          }`}
        >
          <div className={styles.heading}>
            <SprintHeading issues={issues} />
          </div>
          <DealerSection dealer={dealer} />
          <div className={styles.controls}>
            <GameControls />
          </div>
          <h4 className={styles.issuesHeading}>Issues</h4>
          <div className={styles.main}>
<<<<<<< HEAD
            {isStatisticsShown && currentIssue && (
=======
            <IssuesList issues={issues} />
            {showRoundResult && currentIssue && (
>>>>>>> feat: implement admit/reject window
              <div className={styles.statisticsSection}>
                <h4 className={styles.statisticsHeading}>Statistics:</h4>
                <IssueStatistics issue={currentIssue} />
              </div>
            )}
          </div>
          {gameStatus === TGameStatus.roundInProgress && (
            <Deck typeOfDeck={TCardType.fib} />
          )}
        </div>
      )}
      {isSideBarShown && <SideBar />}
    </div>
  );
}
