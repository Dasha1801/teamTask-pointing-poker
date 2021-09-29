import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserSelectors, gameSelectors } from '../../../redux/selectors';
import { thunks } from '../../../redux/thunks/thunks';
import { TIssuePriority } from '../../../redux/types';
import ButtonAdd from '../../shared/buttons/button-add/button-add';
import { CreateIssuePopup } from '../../shared/create-issue-popup/create-issue-popup';
import styles from './card-create-issue.module.scss';

function CreateIssueCard(): JSX.Element {
  const emptyIssue = {
    id: '',
    title: '',
    priority: TIssuePriority.medium,
    link: '',
    lastRoundResult: {},
    score: 0,
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
    <div className={styles.issueCard}>
      <div className={styles.title}>Create new Issue</div>
      <div className={styles.buttonAddContainer}>
        <ButtonAdd onClick={handleShowPopUp} />
      </div>
      {showPopup && (
        <CreateIssuePopup
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          info={issueFields}
          setIssueFields={setIssueFields}
          warning={warning}
        />
      )}
    </div>
  );
}

export default CreateIssueCard;
