import React from 'react';
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
import Members from '../members/members';
import CreateIssueCard from './card-create-issue/card-create-issue';
import styles from './dealer-lobby.module.scss';
import IssueCard from './issue-card/issue-card';
import Settings from './settings/settings';

const DealerLobby = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sideBar = useSelector(lobbyPageSelectors.selectIsSideBarShown);
  const users = useSelector(gameSelectors.selectPlayers);
  const messages = useSelector(gameSelectors.selectGame).messages;
  const messagesIds = new Set(messages.map((item) => item.id));
  const issues = useSelector(gameSelectors.selectIssues);
  const dealer = useSelector(currentUserSelectors.selectCurrentUser);
  const gameSettings = useSelector(gameSettingsSelectors.selectSettings);
  const gameId = useSelector(gameSelectors.selectGame).id;
  const clientHeight = globalThis.screen.height;

  const handleCancel = async () => {
    history.push('/');
    await dispatch(thunks.cancelGameThunk({ dealerId: dealer.id, gameId }));
  };

  const handleStart = async () => {
    history.push(`/game/${gameId}`);
    await dispatch(
      thunks.startGameThunk({
        settings: gameSettings,
        gameId,
        dealerId: dealer.id,
      })
    );
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
                placeholder="http://pockerplanning....."
                className={styles.input}
                value={gameId}
                onChange={() => null}
              />
              <Button
                type="button"
                className={styles.btn}
                onClick={() => globalThis.navigator.clipboard.writeText(gameId)}
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
            message={{
              messagesProps: messages,
              users: users.filter((user) => messagesIds.has(user.id)),
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default DealerLobby;
