import React from 'react';
import { useHistory } from 'react-router';
import { IIssue, Issue } from '../../redux/types';
import { ReactComponent as IconDownload } from '../../shared/assets/icons/download.svg';
import IssueCard from '../game/issue-card/issue-card';
import { ButtonBlue } from '../shared/buttons/button-blue/button-blue';
import IssueScoreStatistics from '../shared/issue-score-statistics/issue-score-statistics';
import SprintHeading from '../shared/sprint-heading/sprint-heading';
import styles from './game-result.module.scss';

function GameResult(): JSX.Element {
  const history = useHistory();
  const { issues } = history.location.state as { issues: IIssue[] };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.headingContainer}>
          <SprintHeading issues={issues} />
          <ButtonBlue className={styles.buttonDownload} title="Download result">
            <IconDownload />
          </ButtonBlue>
        </div>
        <div className={styles.setOfIssues}>
          {issues.map((issue) => {
            return (
              <div className={styles.issueCardContainer} key={issue.id}>
                <IssueCard
                  customClass={styles.customIssueCard}
                  key={issue.id}
                  issue={issue}
                  canEditScore={false}
                  canRemove={false}
                />
                <div className={styles.issueStatisticBlock} key={issue.id}>
                  {Issue.calculateStatistics(issue).map(
                    ([score, percentage]) => (
                      <IssueScoreStatistics
                        key={score}
                        score={score}
                        percentage={percentage}
                      />
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default GameResult;
