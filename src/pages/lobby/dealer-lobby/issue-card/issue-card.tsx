import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  currentUserSelectors,
  gameSelectors,
} from '../../../../redux/selectors';
import { appActions } from '../../../../redux/slices/app/app-slice';
import { AppDispatch } from '../../../../redux/store';
import { thunks } from '../../../../redux/thunks/thunks';
import { IIssue, IRequestResult } from '../../../../redux/types';
import {
  InfoMessage,
  TInfoMessageType,
} from '../../../../redux/types/info-message';
import deleteIssue from '../../../../shared/assets/icons/deleteIssue.png';
import editIssue from '../../../../shared/assets/icons/edit-issue.svg';
import { BasePopup } from '../../../shared/base-popup/base-popup';
import PopupChangeIssue from './popupChangeIssue/popupChangeIssue';
import styles from './issue-card.module.scss';

export interface IPropsIssue {
  infoIssue: IIssue;
}

const IssueCard = ({ infoIssue }: IPropsIssue): JSX.Element => {
  const dealer = useSelector(currentUserSelectors.selectCurrentUser);
  const [showEdit, setShowEdit] = useState(false);
  const [issueFields, setIssueFields] = useState(infoIssue);
  const [warning, setWarning] = useState('');
  const gameId = useSelector(gameSelectors.selectId);
  const [showInfo, setShowInfo] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleClose = () => {
    setShowEdit(false);
  };

  const handleShowEdit = () => {
    setShowEdit(true);
  };

  const showInfoIssue = () => {
    setShowInfo(true);
  };

  const hideInfoIssue = () => {
    setShowInfo(false);
  };
  const handleUpdateIssue = async () => {
    const response = await dispatch(
      thunks.updateIssueThunk({
        dealerId: dealer.id,
        updatedIssue: issueFields,
        gameId,
      })
    );
    handleClose();
    const payload = response.payload as Partial<IRequestResult>;
    if (payload.message) {
      dispatch(
        appActions.addOneInfoMessage(
          new InfoMessage(payload.message, TInfoMessageType.error).toObject()
        )
      );
      return;
    }
  };

  const handleSubmit = () => {
    if (issueFields.link !== '' && issueFields.title !== '') {
      handleUpdateIssue();
    } else {
      setWarning('*fields in the form cannot be empty');
    }
  };

  const handleDeleteIssue = async () => {
    await dispatch(
      thunks.deleteIssueThunk({
        dealerId: dealer.id,
        deletedIssueId: issueFields.id,
        gameId,
      })
    );
  };

  return (
    <>
      <div className={styles.main}>
        <div
          className={styles.name}
          onMouseOver={showInfoIssue}
          onMouseOut={hideInfoIssue}
        >{`${infoIssue.title.slice(0, 13)}...`}</div>
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
          contentProps={{ className: `${styles.warning}` }}
        >
          <PopupChangeIssue
            info={issueFields}
            setIssueFields={setIssueFields}
            warning={warning}
          />
        </BasePopup>
      )}
      {showInfo && (
        <div className={styles.info}>
          <div className={styles.infoTitle}>
            <span className={styles.nameInfo}>Title:</span> {infoIssue.title}
          </div>
          <div className={styles.infoPriority}>
            <span className={styles.nameInfo}>Priority:</span>{' '}
            {infoIssue.priority}
          </div>
        </div>
      )}
    </>
  );
};

export default IssueCard;
