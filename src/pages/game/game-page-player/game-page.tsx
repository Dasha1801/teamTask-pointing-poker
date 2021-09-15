import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
  currentUserSelectors,
  gamePageSelectors,
  gameSelectors,
  gameSettingsSelectors,
} from '../../../redux/selectors';
import { gamePageActions } from '../../../redux/slices/game-page/game-page';
import { gameActions } from '../../../redux/slices/game/game-slice';
import { IUser, TGameStatus, TUserRole } from '../../../redux/types';
import { BasePopup } from '../../shared/base-popup/base-popup';
import DealerSection from '../../shared/dealer-section/dealer-section';
import { IssueStatistics } from '../../shared/issue-statistics/issue-statistics';
import SprintHeading from '../../shared/sprint-heading/sprint-heading';
import GameControls from '../game-controls/game-controls';
import IssuesList from '../issues-list/issues-list';
import SideBar from '../side-bar/side-bar';
import styles from './game-page.module.scss';

export function GamePage(): JSX.Element {
  const history = useHistory();
  const dispatch = useDispatch();
  const isSidebarShown = true;
  const [isStatisticsShown] = useState(false);
  const [createIssue, setCreateIssue] = useState(false);
  const issues = useSelector(gameSelectors.selectIssues);
  const dealer = useSelector(gameSelectors.selectDealer) as IUser;
  const currentIssue = useSelector(gameSelectors.selectCurrentIssue);
  const isDealer = useSelector(currentUserSelectors.selectIsDealer);
  const timer = useSelector(gamePageSelectors.selectTimer);
  const gameSettings = useSelector(gameSettingsSelectors.selectSettings);
  const gameStatus = useSelector(gameSelectors.selectStatus);
  const currentUser = useSelector(currentUserSelectors.selectCurrentUser);

  useEffect(() => {
    if (gameSettings.timer && !timer.minutes && !timer.seconds) {
      dispatch(gameActions.changeStatus(TGameStatus.started));
      dispatch(
        gamePageActions.changeTimer({
          minutes: gameSettings.timer.minutes,
          seconds: gameSettings.timer.seconds,
        })
      );
      dispatch(gameActions.getNextIssue());
    }
  }, [timer]);

  useEffect(() => {
    if (currentUser.role !== TUserRole.dealer) {
      switch (gameStatus) {
        case TGameStatus.inactive:
          history.push('/');
          break;
        default:
          break;
      }
    }
  }, [gameStatus]);

  const handleCreateClick = () => {
    setCreateIssue(true);
  };

  const handleCloseCreateIssueClick = () => {
    setCreateIssue(false);
  };

  return (
    <div className={styles.container}>
      {gameStatus !== TGameStatus.inactive && (
        <div
          className={`${styles.content} ${
            isSidebarShown ? styles.contentWithSidebar : ''
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
            <IssuesList
              issues={issues}
              canEditScore={isDealer}
              canRemove={isDealer}
              canAdd={isDealer}
              handleCreateClick={handleCreateClick}
            />
            {isStatisticsShown && currentIssue && (
              <div className={styles.statisticsSection}>
                <h4 className={styles.statisticsHeading}>Statistics:</h4>
                <IssueStatistics issue={currentIssue} />
              </div>
            )}
          </div>
          <div className={styles.cards}></div>
        </div>
      )}
      {isSidebarShown && <SideBar />}
      {createIssue && (
        <BasePopup
          buttonOkText="Yes"
          buttonCancelText="No"
          buttonCancelProps={{ onClick: handleCloseCreateIssueClick }}
        >
          Create issue
        </BasePopup>
      )}
    </div>
  );
}
