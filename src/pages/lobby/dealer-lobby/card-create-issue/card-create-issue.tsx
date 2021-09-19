import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserSelectors } from '../../../../redux/selectors';
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
  const dispatch = useDispatch();
  const handleClose = () => {
    setShowPopup(false);
  };

  const handleShowPopUp = () => {
    setShowPopup(true);
  };

  const handleSubmit = async () => {
    await dispatch(
      thunks.createIssueThunk({
        dealerId: dealer.id,
        issue: issueFields,
      })
    );
    handleClose();
    setIssueFields(emptyIssue);
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
          />
        </BasePopup>
      )}
    </div>
  );
};

export default CreateIssueCard;
