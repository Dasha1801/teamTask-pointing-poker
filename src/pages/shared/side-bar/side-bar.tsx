import React from 'react';
import { useSelector } from 'react-redux';
import { currentUserSelectors } from '../../../redux/selectors';
import { IMessage, IUser } from '../../../redux/types';
import Player from '../cardPlayer/cardPlayer';
import styles from './side-bar.module.scss';

interface ISideBar {
  message?: IMessageProps;
}

interface IMessageProps {
  messagesProps: IMessage[];
  users: IUser[];
}

const SideBar = ({ message }: ISideBar): JSX.Element => {
  const { messagesProps, users } = message || ({} as IMessageProps);
  const currentUserId = useSelector(currentUserSelectors.selectCurrentUser).id;
  
  return (
    <div className={styles.container}>
      {message ? (
        <>
          {messagesProps.map((item) => {
            return (
              <div className={styles.cardItem} key={item.userId}>
                <div className={styles.message}>{item.message}</div>
                <div className={styles.author}>
                  {users.map((player) => {
                    return (
                      item.id === player.id && (
                        <Player
                          key={player.id}
                          user={player}
                          isCurrentUser={player.id === currentUserId}
                          isPlayer={false}
                        />
                      )
                    );
                  })}
                </div>
              </div>
            );
          })}
        </>
      ) : null}
      {/* вместо null будет содержимое score */}
    </div>
  );
};

export default SideBar;
