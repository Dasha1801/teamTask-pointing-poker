import styles from './messages-list.module.scss';
import React from 'react';
import { useSelector } from 'react-redux';
import { gameSelectors } from '../../../../redux/selectors';
import { TUserRole } from '../../../../redux/types';
import PlayerCard from './player-card/player-card';

export default function MessagesList(): JSX.Element {
  const messages = useSelector(gameSelectors.selectMessages);
  const players = useSelector(gameSelectors.selectPlayers);

  const chatItems = messages.map((message) => {
    return {
      message: message,
      player: players.find((player) => player.id === message.userId),
    };
  });
  return (
    <div className={styles.container}>
      <ul className={styles.messagesList}>
        {chatItems.map(({ message, player }) => {
          return (
            player && (
              <li
                key={`${message.userId}_${message.id}`}
                className={styles.messageItem}
              >
                <div className={styles.cardItem}>
                  <div
                    className={`${styles.message} ${
                      player.role === TUserRole.dealer
                        ? styles.messageHighlight
                        : ''
                    }`}
                  >
                    {message.message}
                  </div>
                  <div className={styles.author}>
                    <PlayerCard user={player} />
                  </div>
                </div>
              </li>
            )
          );
        })}
      </ul>
    </div>
  );
}
