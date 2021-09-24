import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserSelectors } from '../../../redux/selectors';
import { gameActions } from '../../../redux/slices/game/game-slice';
import { IMessage, IUser } from '../../../redux/types';
import messageIcon from '../../../shared/assets/icons/messageIcon.png';
import Player from '../cardPlayer/cardPlayer';
import styles from './side-bar.module.scss';

interface ISideBarProps {
  messages: IMessage[];
  users: IUser[];
}

const SideBar = ({ messages, users }: ISideBarProps): JSX.Element => {
  const currentUserId = useSelector(currentUserSelectors.selectCurrentUser).id;
  // const gameId = useSelector(gameSelectors.selectId);
  const dispatch = useDispatch();
  const [textarea, setTextarea] = useState('');
  console.log(users);
  const chatItems = messages.map((item) => ({
    message: item,
    user: users.find((user) => item.userId === user.id),
  }));
  const handleKeyDown = () => {
    dispatch(
      gameActions.postMessage({
        message: textarea,
        id: '',
        userId: currentUserId,
      })
    );
    setTextarea('');
  };
  // const handleKeyDown = async (e: any) => {
  //   if (e.key === 'Enter') {
  //     // setTextarea('');
  //     await dispatch(
  //       thunks.postMessageThunk({
  //         playerId: currentUserId,
  //         message: {
  //           message: textarea,
  //           id: '',
  //           userId: currentUserId,
  //         },
  //         gameId: gameId,
  //       })
  //     );
  //   }
  // };

  return (
    <div className={styles.container}>
      <>
        {chatItems.map((item) => {
          console.log(item.user);
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
            wrap="hard"
            className={styles.textarea}
            onChange={(event) => setTextarea(event.target.value)}
          />
          {textarea && (
            <img
              src={messageIcon}
              className={styles.iconMessage}
              onClick={handleKeyDown}
            ></img>
          )}
        </Form.Group>
      </Form>
    </div>
  );
};

export default SideBar;
