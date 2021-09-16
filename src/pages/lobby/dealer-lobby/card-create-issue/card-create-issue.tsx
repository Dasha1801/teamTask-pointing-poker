import styles from './card-create-issue.module.scss';
import React from 'react';

const CreateIssueCard = (): JSX.Element => {
  return (
    <div className={styles.cardCreateIssue}>
      <div className={styles.name}>Crete new Issue</div>
      <div className={styles.addIssue}>+</div>
    </div>
  );
};

export default CreateIssueCard;
