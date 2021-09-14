import styles from './game-page.module.scss';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { currentUserSelectors, gameSelectors } from '../../../redux/selectors';
import { IIssue, IUser, TUserRole } from '../../../redux/types';
import { BasePopup } from '../../shared/base-popup/base-popup';
import DealerSection from '../../shared/dealer-section/dealer-section';
import { IssueStatistics } from '../../shared/issue-statistics/issue-statistics';
import SprintHeading from '../../shared/sprint-heading/sprint-heading';
import GameControls from '../game-controls/game-controls';
import IssuesList from '../issues-list/issues-list';

export function GamePage(): JSX.Element {
  const [isStatisticsShown] = useState(false);
  const [createIssue, setCreateIssue] = useState(false);
  const issues = useSelector(gameSelectors.selectIssues);
  const dealer = useSelector(gameSelectors.selectDealer) as IUser;
  const currentUser = useSelector(currentUserSelectors.selectCurrentUser);
  const currentIssueId = useSelector(gameSelectors.selectCurrentIssueId);
  const currentIssue = issues.find(
    (issue) => issue.id === currentIssueId
  ) as IIssue;
  const isDealer = currentUser.role === TUserRole.dealer;

  const handleCreateClick = () => {
    setCreateIssue(true);
  };

  const handleCloseCreateIssueClick = () => {
    setCreateIssue(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.heading}>
          <SprintHeading issues={issues} />
        </div>
        <DealerSection
          dealer={dealer}
          isCurrentUser={currentUser.id === dealer.id}
        />
        <div className={styles.controls}>
          <GameControls
            isDealer={currentUser.id === dealer.id}
            minutes={10}
            seconds={20}
          />
        </div>
        <h4 className={styles.issuesHeading}>Issues</h4>
        <div className={styles.main}>
          <IssuesList
            issues={issues}
            canEditScore={isDealer}
            canRemove={isDealer}
            canAdd={isDealer}
            currentIssueId={currentIssueId}
            handleCreateClick={handleCreateClick}
          />
          {isStatisticsShown && (
            <div className={styles.statisticsSection}>
              <h4 className={styles.statisticsHeading}>Statistics:</h4>
              <IssueStatistics issue={currentIssue} />
            </div>
          )}
        </div>
        <div className={styles.cards}></div>
      </div>
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
