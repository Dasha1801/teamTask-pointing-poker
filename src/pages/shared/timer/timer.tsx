import styles from './timer.module.scss';
import React from 'react';

interface ITimerProps {
  minutes: number;
  seconds: number;
  disabled?: boolean;
}

export default function Timer({minutes, seconds, disabled = false}: ITimerProps): JSX.Element {
 return (
   <div className={styles.timer}>
     <div className={styles.legend}>
       <span className="legendMinutes">minutes</span>
       <span className="legendSeconds">seconds</span>

     </div>
     <div className={styles.time}>
      <input disabled={disabled} type="number" min="0" max="59" className={`${styles.minutes} ${styles.input}`} defaultValue={minutes}/>
      <span className={styles.colon}>:</span>
      <input disabled={disabled} type="number" min="5" max="59" className={`${styles.seconds} ${styles.input}`} defaultValue={seconds}/>
     </div>
   </div>
 );
}
