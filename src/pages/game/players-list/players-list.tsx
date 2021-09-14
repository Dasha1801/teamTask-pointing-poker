import styles from './players-list.module.scss';
import React from 'react';
import { IUser } from '../../../redux/types';

interface IPlayersListProps {
  players: IUser[];
}

function PlayerItem({ player }: { player: IUser }) {
  return (
    <div className="player">
      {player.firstName} {player.lastName || ''}
    </div>
  );
}

export function PlayersList({ players }: IPlayersListProps): JSX.Element {
  return (
    <div className={styles.container}>
      <ul className={styles.scores}></ul>
      <ul className={styles.players}>
        {players.map((player) => {
          return (
            <li className={styles.playerItem} key={player.id}>
              <PlayerItem player={player} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
