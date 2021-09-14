import styles from './main.module.css';
import React from 'react';
import { ButtonBlue } from '../../shared/buttons/button-blue/button-blue';
import { IUser, TUserRole } from '../../../redux/types';
import { useSelector } from 'react-redux';
import { currentUserSelectors } from '../../../redux/selectors';

function Player({ player }: { player: IUser }): JSX.Element {
  return <div>{player.firstName}</div>;
}

export default function Main({ players }: { players: IUser[] }): JSX.Element {
  const userRole = useSelector(currentUserSelectors.selectCurrentUser);
  return (
    <>
      <h3 className="issues-heading">Issues</h3>
      <div className={styles.main}>
        <ul>
          {players.map((player) => {
            <Player player={player} key={player.id} />;
          })}
        </ul>
        {userRole.role === TUserRole.dealer && (
          <>
            <ButtonBlue>Run Round</ButtonBlue>
            <ButtonBlue>Restart Round</ButtonBlue>
            <ButtonBlue>Next Issue</ButtonBlue>
          </>
        )}
      </div>
    </>
  );
}
