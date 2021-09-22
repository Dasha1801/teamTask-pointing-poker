import React from 'react';
import { useSelector } from 'react-redux';
import { currentUserSelectors, gameSelectors } from '../../../redux/selectors';
import { IIssue, TUserRole } from '../../../redux/types';
import CreateNewIssue from '../../shared/create-new-issue/create-new-issue';
import IssueCard from '../issue-card/issue-card';
import styles from './issues-list.module.scss';

interface IIssuesListProps {
  issues: IIssue[];
  canEditScore: boolean;
  canRemove: boolean;
  canAdd: boolean;
  handleCreateClick: () => void;
}

export default function IssuesList({
  issues,
  canEditScore,
  canRemove,
  handleCreateClick,
}: IIssuesListProps): JSX.Element {
  const currentUser = useSelector(currentUserSelectors.selectCurrentUser);
  const currentIssue = useSelector(gameSelectors.selectCurrentIssue);
  return (
    <ul className={styles.issuesList}>
      {issues.map((issue) => (
        <li key={issue.id} className={styles.listItem}>
          <IssueCard
            issue={issue}
            isCurrent={issue.id === currentIssue?.id}
            canEditScore={canEditScore}
            canRemove={canRemove}
          />
        </li>
      ))}
      {currentUser.role === TUserRole.dealer && (
        <CreateNewIssue handleCreateClick={handleCreateClick} />
      )}
    </ul>
  );
}
