import React from 'react';
import { useSelector } from 'react-redux';
import { currentUserSelectors, gameSelectors } from '../../../redux/selectors';
import CreateIssueCard from '../card-create-issue/card-create-issue';
import IssueCard from '../issue-card/issue-card';
import styles from './issues-list.module.scss';

export default function IssuesList(): JSX.Element {
  const issues = useSelector(gameSelectors.selectIssues);
  const isDealer = useSelector(currentUserSelectors.selectIsDealer);
  return (
    <ul className={styles.issuesList}>
      {issues.map((issue) => (
        <li key={issue.id} className={styles.listItem}>
          <IssueCard
            issue={issue}
            canEditScore={isDealer}
            canRemove={isDealer}
          />
        </li>
      ))}
      {isDealer && <CreateIssueCard />}
    </ul>
  );
}
