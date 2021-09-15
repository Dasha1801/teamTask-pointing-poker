import React from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { gameSelectors, lobbyPageSelectors } from '../../../redux/selectors';
import { gameActions } from '../../../redux/slices/game/game-slice';
import editIssue from '../../../shared/assets/icons/edit-issue.svg';
import deleteIssue from '../../../shared/assets/icons/deleteIssue.png';
import { mockIssues, mockMessages, mockUsers } from '../../../shared/mocks';
import SideBar from '../../shared/side-bar/side-bar';
import SprintHeading from '../../shared/sprint-heading/sprint-heading';
import AboutDealer from '../about-dealer/about-dealer';
import Members from '../members/members';
import styles from './dealer-lobby.module.scss';

const DealerLobby = (): JSX.Element => {
  const dispatch = useDispatch();
  dispatch(gameActions.changePlayers(mockUsers));
  dispatch(gameActions.changeMessages(mockMessages));
  dispatch(gameActions.changeIssues(mockIssues));
  const sideBar = useSelector(lobbyPageSelectors.selectIsSideBarShown);
  const users = useSelector(gameSelectors.selectPlayers);
  const messages = useSelector(gameSelectors.selectGame).messages;
  const messagesIds = new Set(messages.map((item) => item.id));
  const issues = useSelector(gameSelectors.selectIssues);

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
            // onClick={handleClickConnect}
          >
            Start Game
          </Button>
          <Button
            type="button"
            className={styles.btnCancel}
            // onClick={handleClickConnect}
          >
            Cancel game
          </Button>
        </div>
        <Members users={users} />

        <div className={styles.issuesContainer}>
          <h2 className={styles.titleIssues}>Issues:</h2>
          <div className={styles.wrapperIssue}>
            {issues.map((item, index) => {
              return (
                <div className={styles.card} key={index}>
                  <div className={styles.main}>
                    <div className={styles.name}>{item.title}</div>
                    <img src={editIssue} className={styles.iconEdit}></img>
                    <img src={deleteIssue} className={styles.iconDelete}></img>
                  </div>
                  <div className={styles.priority}>
                    Priority {item.priority}
                  </div>
                </div>
              );
            })}
            <div className={styles.cardCreateIssue}>
              <div className={styles.name}>Crete new Issue</div>
              <div className={styles.addIssue}>+</div>
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
    </div>
  );
};

export default DealerLobby;
