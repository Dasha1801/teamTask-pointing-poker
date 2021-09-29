import styles from './issue-statistics.module.scss';
import React from 'react';
import { IIssue, Issue } from '../../../redux/types';

export function IssueStatistics({ issue }: { issue: IIssue }): JSX.Element {
  return (
    <div className={styles.container}>
      <ul className={styles.issuesList}>
        {Object.entries(Issue.calculateStatistics(issue)).map(
          ([score, percentage]) => {
            return (
              <li key={`${score}`}>
                {`${
                  percentage === Math.trunc(percentage as number)
                    ? percentage
                    : (percentage as number).toFixed(1)
                }%`}
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
}
