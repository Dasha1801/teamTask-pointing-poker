import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserSelectors } from '../../../../redux/selectors';
import { thunks } from '../../../../redux/thunks/thunks';
import { IIssue } from '../../../../redux/types';
import deleteIssue from '../../../../shared/assets/icons/deleteIssue.png';
import editIssue from '../../../../shared/assets/icons/edit-issue.svg';
import { BasePopup } from '../../../shared/base-popup/base-popup';
import styles from './issue-card.module.scss';
import PopupChangeIssue from './popupChangeIssue/popupChangeIssue';

export interface IPropsIssue {
  infoIssue: IIssue;
}

const IssueCard = ({ infoIssue }: IPropsIssue): JSX.Element => {
  const dealer = useSelector(currentUserSelectors.selectCurrentUser);
  const [showEdit, setShowEdit] = useState(false);
  const [issueFields, setIssueFields] = useState(infoIssue);
  const dispatch = useDispatch();
  const handleClose = () => {
    setShowEdit(false);
  };

  const handleShowEdit = () => {
    setShowEdit(true);
  };

  const handleSubmit = async () => {
    await dispatch(
      thunks.updateIssueThunk({
        dealerId: dealer.id,
        updatedIssue: issueFields,
      })
    );
    handleClose();
  };

  const handleDeleteIssue = async () => {
    await dispatch(
      thunks.deleteIssueThunk({
        dealerId: dealer.id,
        deletedIssueId: issueFields.id,
      })
    );
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
        <img
          src={deleteIssue}
          className={styles.iconDelete}
          onClick={handleDeleteIssue}
        ></img>
      </div>
      <div className={styles.priority}>Priority {infoIssue.priority}</div>

      {showEdit && (
        <BasePopup
          buttonCancelProps={{ onClick: handleClose }}
          buttonOkProps={{ onClick: handleSubmit }}
          buttonCancelText="No"
          buttonOkText="Yes"
        >
          <PopupChangeIssue
            info={issueFields}
            setIssueFields={setIssueFields}
          />
        </BasePopup>
      )}
    </>
  );
};

export default IssueCard;
