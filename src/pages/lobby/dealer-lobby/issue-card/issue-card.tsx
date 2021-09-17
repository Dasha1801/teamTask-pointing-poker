import styles from './issue-card.module.scss';
import React, { useState } from 'react';
import deleteIssue from '../../../../shared/assets/icons/deleteIssue.png';
import editIssue from '../../../../shared/assets/icons/edit-issue.svg';
import { IIssue } from '../../../../redux/types';
import { BasePopup } from '../../../shared/base-popup/base-popup';

interface IPropsIssue {
  infoIssue: IIssue;
}

const IssueCard = ({ infoIssue }: IPropsIssue): JSX.Element => {
  const [showEdit, setShowEdit] = useState(false);

  const handleClose = () => {
    setShowEdit(false);
  };

  const handleShowEdit = () => {
    setShowEdit(true);
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.name}>{infoIssue.title}</div>
        <img
          src={editIssue}
          className={styles.iconEdit}
          onClick={handleShowEdit}
        ></img>
        <img src={deleteIssue} className={styles.iconDelete}></img>
      </div>
      <div className={styles.priority}>Priority {infoIssue.priority}</div>

      {showEdit && (
        <BasePopup
          buttonCancelProps={{ onClick: handleClose }}
          buttonCancelText="Cancel"
        />
      )}
    </>
  );
};

export default IssueCard;
