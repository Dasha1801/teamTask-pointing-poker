import { PayloadAction } from '@reduxjs/toolkit';
import React, { SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserSelectors, gameSelectors } from '../../../redux/selectors';
import { appActions } from '../../../redux/slices/app/app-slice';
import { AppDispatch } from '../../../redux/store';
import { thunks } from '../../../redux/thunks/thunks';
import { IIssue, IRequestResult, TIssuePriority } from '../../../redux/types';
import {
  InfoMessage,
  TInfoMessageType,
} from '../../../redux/types/info-message';
import { APP_CONSTANTS } from '../../../shared/constants';
import { CreateIssuePopup } from '../../shared/create-issue-popup/create-issue-popup';
import uploadIcon from '../../../shared/assets/icons/upload.svg';
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
  const dispatch = useDispatch<AppDispatch>();

  const handleClose = () => {
    setShowPopup(false);
  };

  const handleShowPopUp = () => {
    setShowPopup(true);
  };

  const handleCreateIssue = async () => {
    const response = await dispatch(
      thunks.createIssueThunk({
        dealerId: dealer.id,
        addedIssue: issueFields,
        gameId,
      })
    );
    handleClose();
    setIssueFields(emptyIssue);
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

  const handleFile = async (e: ProgressEvent<FileReader>) => {
    try {
      const content = JSON.parse((e.target as FileReader).result as string);
      const { issues } = content;
      const promises: Array<Promise<PayloadAction<IRequestResult>>> =
        issues.map((item: IIssue) =>
          dispatch(
            thunks.createIssueThunk({
              dealerId: dealer.id,
              addedIssue: item,
              gameId,
            })
          )
        );
      for (let i = 0; i < promises.length; i++) {
        const response = await promises[i];
        const { message } = response.payload;
        if (message) {
          dispatch(
            appActions.addOneInfoMessage(
              new InfoMessage(message, TInfoMessageType.error).toObject()
            )
          );
          break;
        }
      }
    } catch (error) {
      dispatch(
        appActions.addOneInfoMessage(
          new InfoMessage(
            `Can't parse the file - make sure it has the right structure`,
            TInfoMessageType.error
          ).toObject()
        )
      );
    }
  };

  const handleChangeFile = (e: SyntheticEvent) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) {
      return;
    }
    const fileData = new FileReader();
    const fileSizeKb = file.size / 1000;

    if (fileSizeKb <= APP_CONSTANTS.MAX_FILE_SIZE * 1024) {
      fileData.onload = handleFile;
      fileData.readAsText(file);
    } else {
      dispatch(
        appActions.addOneInfoMessage(
          new InfoMessage(
            `Maximum file size is ${APP_CONSTANTS.MAX_FILE_SIZE} Mb`,
            TInfoMessageType.error
          )
        )
      );
    }
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
      <div className={styles.name}>Create new Issue</div>
      <div className={styles.containerBtn}>
        <div className={styles.form__inputFile}>
          <label htmlFor="file">
            <img
              title='Choose file with issues: {
              "issues": [
                  {"title": ..., "priority": ...},
                  ...
                ]
            }
            }'
              src={uploadIcon}
              alt="load from file"
              className={styles.uploadIcon}
            />
          </label>
          <input
            className={styles.visuallyHidden}
            type="file"
            id="file"
            onChange={handleChangeFile}
            value=""
            accept=".json"
          />
        </div>
        <span
          className={styles.addedIssue}
          onClick={handleShowPopUp}
          title="Add issue"
        >
          +
        </span>
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
