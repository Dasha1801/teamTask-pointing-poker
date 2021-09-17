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
import Timer from '../../shared/timer/timer';
import AboutDealer from '../about-dealer/about-dealer';
import Members from '../members/members';
import CreateIssueCard from './card-create-issue/card-create-issue';
import styles from './dealer-lobby.module.scss';
import IssueCard from './issue-card/issue-card';
import SwitcherSettings from './switcher-settings/switcher-settings';

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

  const handleCancel = async () => {
    history.push('/');
    await dispatch(thunks.finishGameThunk({ dealerId: dealer.id }));
  };

  const handleStart = async () => {
    history.push('/game/:gameId');
    await dispatch(thunks.startGameThunk({ settings: gameSettings }));
  };
  return (
    <div className={styles.rootContainer}>
      <div className={styles.wrapper}>
        <div className={styles.titleSprint}>
          <SprintHeading issues={issues} />
          <img src={editIssue} className={styles.iconIssue}></img>
        </div>
        <AboutDealer />
        <div className={styles.containerLinkToLobby}>
          <h4 className={styles.titleLinkTo}>Link to lobby:</h4>
          <Form>
            <Form.Group>
              <Form.Control
                type="url"
                placeholder="http://pockerplanning....."
                // value={url}
                className={styles.input}
                // onChange={handleChange}
              />
              <Button
                type="button"
                className={styles.btn}
                // onClick={handleClickConnect}
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

          <div className={styles.settingsList}>
            <div className={styles.itemSettings}>
              <h5 className={styles.setting}>Scram master as player:</h5>
              <SwitcherSettings />
            </div>

            <div className={styles.itemSettings}>
              <h5 className={styles.setting}>Changing card in round end:</h5>
              <SwitcherSettings />
            </div>

            <div className={styles.itemSettings}>
              <h5 className={styles.setting}>Is timer needed:</h5>
              <SwitcherSettings />
            </div>

            <div className={styles.itemSettings}>
              <h5 className={styles.setting}>Score type:</h5>
              <select className={styles.select}>
                <option>aaaaaaaaaaaaaaa</option>
                <option>sssssssssss</option>
                <option>gggggggggg</option>
              </select>
            </div>

            <div className={styles.itemSettings}>
              <h5 className={styles.setting}>Score type (Short):</h5>
              <select className={styles.select}>
                <option>aaaaaaaaaaaaaaa</option>
                <option>sssssssssss</option>
                <option>gggggggggg</option>
              </select>
            </div>

            <div className={styles.itemSettings}>
              <h5 className={styles.setting}>Round time:</h5>
              <Timer minutes={2} seconds={30} />
            </div>

            <div className={styles.itemSettings}>
              <h5 className={styles.setting}>Add card values:</h5>
            </div>
          </div>
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
