import styles from './issue-statistics.module.scss';
import React from 'react';
import { IIssue, Issue } from '../../../redux/types';

export function IssueStatistics({ issue }: { issue: IIssue }): JSX.Element {
  return (
    <div className={styles.container}>
      <ul className={styles.issuesList}>
        {Issue.getRoundResultPercentages(issue).map((percentage, index) => {
          return (
            <li key={`${percentage}_${index}`}>
              {`${
                percentage === Math.trunc(percentage)
                  ? percentage
                  : percentage.toFixed(1)
              }%`}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
