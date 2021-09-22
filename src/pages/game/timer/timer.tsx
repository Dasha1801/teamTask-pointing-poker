import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gamePageSelectors, gameSelectors } from '../../../redux/selectors';
import { gamePageActions } from '../../../redux/slices/game-page/game-page';
import { TGameStatus } from '../../../redux/types';

export default function Timer(): JSX.Element {
  const MAX_SECONDS = 59;
  const dispatch = useDispatch();
  const timer = useSelector(gamePageSelectors.selectTimer);
  const gameStatus = useSelector(gameSelectors.selectStatus);
  const intervalHandle = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    let innerTimer = { ...timer };
    if (
      gameStatus === TGameStatus.roundInProgress &&
      (innerTimer.minutes || innerTimer.seconds)
    ) {
      intervalHandle.current = setInterval(() => {
        let minutes = innerTimer.minutes;
        if (innerTimer.seconds === 0) {
          minutes = Math.max(0, innerTimer.minutes - 1);
        }
        let seconds = Math.max(0, innerTimer.seconds - 1);
        if (!seconds) {
          if (minutes) {
            seconds = MAX_SECONDS;
            minutes -= 1;
          } else {
            clearInterval(Number(intervalHandle.current));
          }
        }
        dispatch(gamePageActions.changeTimer({ minutes, seconds }));
        innerTimer = { minutes, seconds };
        return () => {
          clearInterval(Number(intervalHandle.current));
        };
      }, 1000);
    }
  }, [gameStatus]);

  return (
    <div></div>
    // <BaseTimer
    //   minutesProps={{ disabled: true, value: timer.minutes }}
    //   secondsProps={{ disabled: true, value: timer.seconds }}
    // />
  );
}
