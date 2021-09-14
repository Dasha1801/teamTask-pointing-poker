import styles from './game-controls.module.scss';
import React from 'react';
import { BaseButton } from '../../shared/buttons/base-button/base-button';
import Timer from '../../shared/timer/timer';
import { ButtonBlue } from '../../shared/buttons/button-blue/button-blue';

interface IGameControlsProps {
  isDealer: boolean;
  minutes?: number;
  seconds?: number;
}

export default function GameControls({
  isDealer,
  minutes,
  seconds,
}: IGameControlsProps): JSX.Element {
  return (
    <div className={styles.gameControls}>
      <div className={styles.timer}>
        {minutes && seconds && (
          <Timer minutes={minutes} seconds={seconds} disabled={false} />
        )}
      </div>
      <div className={styles.buttons}>
        {isDealer && (
          <>
            <div className={styles.gameButtons}>
              <BaseButton className={styles.button}>Stop Game</BaseButton>
              <BaseButton className={styles.button}>Finish Game</BaseButton>
            </div>
            <div className={styles.roundButtons}>
              <ButtonBlue className={styles.button}>Start round</ButtonBlue>
              <ButtonBlue className={styles.button}>Restart round</ButtonBlue>
              <ButtonBlue className={styles.button}>Next issue</ButtonBlue>
            </div>
          </>
        )}
        {!isDealer && <BaseButton className={styles.button}>Exit</BaseButton>}{' '}
      </div>
    </div>
  );
}
