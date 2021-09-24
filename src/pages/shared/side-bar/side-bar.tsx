import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserSelectors, gameSelectors } from '../../../redux/selectors';
import { thunks } from '../../../redux/thunks/thunks';
import { IMessage, IUser, Message } from '../../../redux/types';
import messageIcon from '../../../shared/assets/icons/messageIcon.png';
import Player from '../cardPlayer/cardPlayer';
import styles from './side-bar.module.scss';

interface ISideBarProps {
  messages: IMessage[];
  users: IUser[];
}

const SideBar = ({ messages, users }: ISideBarProps): JSX.Element => {
  const currentUserId = useSelector(currentUserSelectors.selectCurrentUser).id;
  const gameId = useSelector(gameSelectors.selectId);
  const dispatch = useDispatch();
  const [textarea, setTextarea] = useState('');

  const chatItems = messages.map((item) => ({
    message: item,
    user: users.find((user) => item.userId === user.id),
  }));

  const handleSubmit = async () => {
    const message = new Message({ message: textarea, userId: currentUserId });

    await dispatch(
      thunks.postMessageThunk({
        message,
        gameId: gameId,
      })
    );
    setTextarea('');
  };

  return (
    <div className={styles.container}>
      <>
        {chatItems.map((item) => {
          return (
            <>
              <div className={styles.cardItem} key={item.message.id}>
                <div className={styles.message}>{item.message.message}</div>
                <div className={styles.author}>
                  {item.user && (
                    <Player
                      key={item.user.id}
                      user={item.user}
                      isCurrentUser={item.user.id === currentUserId}
                      isPlayer={false}
                    />
                  )}
                </div>
              </div>
            </>
          );
        })}
      </>

      <Form>
        <Form.Group className={styles.wrapperMessage}>
          <Form.Control
            as="textarea"
            value={textarea}
            placeholder="write message....."
            className={styles.textarea}
            onChange={(event) => setTextarea(event.target.value)}
          />
          {textarea && (
            <img
              src={messageIcon}
              className={styles.iconMessage}
              onClick={handleSubmit}
            ></img>
          )}
        </Form.Group>
      </Form>
    </div>
  );
};

export default SideBar;
