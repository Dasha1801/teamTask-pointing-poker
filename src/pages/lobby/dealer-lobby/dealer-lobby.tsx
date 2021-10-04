import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
  currentUserSelectors,
  gameSelectors,
  gameSettingsSelectors,
  lobbyPageSelectors,
} from '../../../redux/selectors';
import { thunks } from '../../../redux/thunks/thunks';
import editIssue from '../../../shared/assets/icons/edit-issue.svg';
import SideBar from '../../shared/side-bar/side-bar';
import SprintHeading from '../../shared/sprint-heading/sprint-heading';
import AboutDealer from '../about-dealer/about-dealer';
import CreateIssueCard from '../card-create-issue/card-create-issue';
import Members from '../members/members';
import IssueCard from './issue-card/issue-card';
import Settings from './settings/settings';
import { IRequestResult, TGameStatus } from '../../../redux/types';
import { APP_CONSTANTS } from '../../../shared/constants';
import {
  InfoMessage,
  TInfoMessageType,
} from '../../../redux/types/info-message';
import { appActions } from '../../../redux/slices/app/app-slice';
import { AppDispatch } from '../../../redux/store';
import styles from './dealer-lobby.module.scss';

const DealerLobby = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const sideBar = useSelector(lobbyPageSelectors.selectIsSideBarShown);
  const users = useSelector(gameSelectors.selectPlayers);
  const messages = useSelector(gameSelectors.selectGame).messages;
  const issues = useSelector(gameSelectors.selectIssues);
  const dealer = useSelector(currentUserSelectors.selectCurrentUser);
  const gameSettings = useSelector(gameSettingsSelectors.selectSettings);
  const gameId = useSelector(gameSelectors.selectGame).id;
  const gameStatus = useSelector(gameSelectors.selectStatus);
  const clientHeight = globalThis.screen.height;
  const [messageUserIds, setMessageUserIds] = useState(new Set());

  useEffect(() => {
    setMessageUserIds(new Set(messages.map((item) => item.userId)));
  }, [messages]);

  const [gameURL] = useState(`${APP_CONSTANTS.URL}/lobby/${gameId}`);

  useEffect(() => {
    if (gameStatus === TGameStatus.inactive) {
      history.replace('/');
    }
  }, [gameStatus]);

  const handleCancel = async () => {
    const response = await dispatch(
      thunks.cancelGameThunk({ dealerId: dealer.id, gameId })
    );
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

  const handleStart = async () => {
    const response = await dispatch(
      thunks.startGameThunk({
        settings: gameSettings,
        gameId,
        dealerId: dealer.id,
      })
    );
    const payload = response.payload as Partial<IRequestResult>;
    if (payload.message) {
      dispatch(
        appActions.addOneInfoMessage(
          new InfoMessage(payload.message, TInfoMessageType.error).toObject()
        )
      );
      return;
    }
    history.replace(`/game/${gameId}`);
  };

  return (
    <div className={styles.rootContainer}>
      <div className={styles.wrapper}>
        <div className={styles.titleSprint}>
          <SprintHeading issues={issues} />
          <img
            src={editIssue}
            className={styles.iconIssue}
            onClick={() => scroll(0, clientHeight)}
          ></img>
        </div>
        <AboutDealer />
        <div className={styles.containerLinkToLobby}>
          <h4 className={styles.titleLinkTo}>Link to lobby:</h4>
          <Form>
            <Form.Group>
              <Form.Control
                type="url"
                className={styles.input}
                value={gameURL}
                readOnly={true}
              />
              <Button
                type="button"
                className={styles.btn}
                onClick={() =>
                  globalThis.navigator.clipboard.writeText(gameURL)
                }
              >
                Copy
              </Button>
            </Form.Group>
          </Form>
        </div>
        <div className={styles.btnGameContainer}>
          <Button
            type="button"
            className={styles.btnStart}
            onClick={handleStart}
          >
            Start Game
          </Button>
          <Button
            type="button"
            className={styles.btnCancel}
            onClick={handleCancel}
          >
            Cancel game
          </Button>
        </div>
        <Members users={users} />
        <div className={styles.issuesContainer}>
          <h2 className={styles.titleIssues}>Issues:</h2>
          <div className={styles.wrapperIssue}>
            {issues.map((item) => {
              return (
                <div className={styles.card} key={item.id}>
                  <IssueCard infoIssue={item} />
                </div>
              );
            })}
            <CreateIssueCard />
          </div>
        </div>

        <div className={styles.containerSettings}>
          <div className={styles.titleSettings}>Game settings:</div>
          <Settings />
        </div>
      </div>
      {sideBar ? (
        <div className={styles.sideBar}>
          <SideBar
            messages={messages}
            users={users.filter((user) => messageUserIds.has(user.id))}
          />
        </div>
      ) : null}
    </div>
  );
};

export default DealerLobby;
