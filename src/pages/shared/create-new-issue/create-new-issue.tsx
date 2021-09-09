import React from 'react';
import ButtonAdd from '../buttons/button-add/button-add';
import styles from './create-new-issue.module.scss';

interface ICreateNewIssueProps {
  handleCreateClick: () => void;
}

export default function CreateNewIssue({
  handleCreateClick,
}: ICreateNewIssueProps): JSX.Element {
  return (
    <div className={styles.issueCard}>
      <div className={styles.title}>Create new issue</div>
      <div className={styles.buttonAddContainer}>
        <ButtonAdd onClick={handleCreateClick} />
      </div>
    </div>
  );
}
