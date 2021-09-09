import React from 'react';
import { IIssue } from '../../../redux/types';
import CreateNewIssue from '../../shared/create-new-issue/create-new-issue';
import IssueCard from '../issue-card/issue-card';
import styles from './issues-list.module.scss';

interface IIssuesListProps {
  issues: IIssue[];
  canEditScore: boolean;
  canRemove: boolean;
  canAdd: boolean;
  currentIssueId: string;
  handleCreateClick: () => void;
}

export default function IssuesList({
  issues,
  canEditScore,
  currentIssueId,
  canRemove,
  handleCreateClick,
}: IIssuesListProps): JSX.Element {
  return (
    <ul className={styles.issuesList}>
      {issues.map((issue) => (
        <li key={issue.id} className={styles.listItem}>
          <IssueCard
            issue={issue}
            isCurrent={issue.id === currentIssueId}
            canEditScore={canEditScore}
            canRemove={canRemove}
          />
        </li>
      ))}
      <CreateNewIssue handleCreateClick={handleCreateClick} />
    </ul>
  );
}
