import styles from './issue-card.module.scss';
import React from 'react';
import deleteIssue from '../../../../shared/assets/icons/deleteIssue.png';
import editIssue from '../../../../shared/assets/icons/edit-issue.svg';
import { IIssue } from '../../../../redux/types';

interface IPropsIssue {
  infoIssue: IIssue;
}

const IssueCard = ({ infoIssue }: IPropsIssue): JSX.Element => {
  return (
   
    <>
      <div className={styles.main}>
        <div className={styles.name}>{infoIssue.title}</div>
        <img src={editIssue} className={styles.iconEdit}></img>
        <img src={deleteIssue} className={styles.iconDelete}></img>
      </div>
      <div className={styles.priority}>Priority {infoIssue.priority}</div>
      </>
   
  );
};

export default IssueCard;
