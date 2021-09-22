import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  currentUserSelectors,
  gameSelectors,
} from '../../../../redux/selectors';
import { thunks } from '../../../../redux/thunks/thunks';
import { TIssuePriority } from '../../../../redux/types';
import { BasePopup } from '../../../shared/base-popup/base-popup';
import PopupChangeIssue from '../issue-card/popupChangeIssue/popupChangeIssue';
import styles from './card-create-issue.module.scss';

const CreateIssueCard = (): JSX.Element => {
  const emptyIssue = {
    id: '',
    title: '',
    priority: TIssuePriority.medium,
    link: '',
    lastRoundResult: {},
  };
  const dealer = useSelector(currentUserSelectors.selectCurrentUser);
  const [showPopup, setShowPopup] = useState(false);
  const [issueFields, setIssueFields] = useState(emptyIssue);
  const [warning, setWarning] = useState('');
  const gameId = useSelector(gameSelectors.selectId);
  const dispatch = useDispatch();
  const handleClose = () => {
    setShowPopup(false);
  };

  const handleShowPopUp = () => {
    setShowPopup(true);
  };

  const handleCreateIssue = async () => {
    await dispatch(
      thunks.createIssueThunk({
        dealerId: dealer.id,
        addedIssue: issueFields,
        gameId,
      })
    );
    handleClose();
    setIssueFields(emptyIssue);
  };

  const handleSubmit = () => {
    if (issueFields.link !== '' && issueFields.title !== '') {
      handleCreateIssue();
    } else {
      setWarning('*fields in the form cannot be empty');
    }
  };

  return (
    <div className={styles.cardCreateIssue}>
      <div className={styles.name}>Crete new Issue</div>
      <div className={styles.addIssue} onClick={handleShowPopUp}>
        +
      </div>
      {showPopup && (
        <BasePopup
          buttonCancelProps={{ onClick: handleClose }}
          buttonOkProps={{ onClick: handleSubmit }}
          buttonCancelText="No"
          buttonOkText="Yes"
        >
          <PopupChangeIssue
            info={issueFields}
            setIssueFields={setIssueFields}
            warning={warning}
          />
        </BasePopup>
      )}
    </div>
  );
};

export default CreateIssueCard;
