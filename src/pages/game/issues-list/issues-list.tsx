import React from 'react';
import { useSelector } from 'react-redux';
import { currentUserSelectors, gameSelectors } from '../../../redux/selectors';
import { IIssue } from '../../../redux/types';
import CreateIssueCard from '../card-create-issue/card-create-issue';
import IssueCard from '../issue-card/issue-card';
import styles from './issues-list.module.scss';

interface IIssuesListProps {
  issues: IIssue[];
}

export default function IssuesList({ issues }: IIssuesListProps): JSX.Element {
  const isDealer = useSelector(currentUserSelectors.selectIsDealer);
  const currentIssueId = useSelector(gameSelectors.selectCurrentIssueId);
  return (
    <ul className={styles.issuesList}>
      {issues.map((issue) => (
        <li key={issue.id} className={styles.listItem}>
          <IssueCard
            issue={issue}
            isCurrent={issue.id === currentIssueId}
            canEditScore={isDealer}
            canRemove={isDealer}
          />
        </li>
      ))}
      {isDealer && <CreateIssueCard />}
    </ul>
  );
}
