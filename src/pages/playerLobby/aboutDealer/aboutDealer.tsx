import styles from './aboutDealer.module.scss';
import React from 'react';
import { IIssue, IUser } from '../../../redux/types';
import Player from '../../shared/cardPlayer/cardPlayer';
import { useSelector } from 'react-redux';
import { currentUserSelectors } from '../../../redux/selectors';


interface IDealerProps{
  info : {
    dealer: IUser;
    issue: IIssue[];
  }
};
const AboutDealer = ({info}:IDealerProps):JSX.Element => {
  const currentUserId = useSelector(currentUserSelectors.selectCurrentUser).id;
  const dealer = info.dealer;
  const issue = info.issue;

  const getTitleIssue = () => {
    let str = '';
    issue.map(item => {
        str += `${item.title}, `;
    });
    return str.length < 30? str: `${str.slice(0,29)}...`;
  }

  const title = getTitleIssue();


  return(
    <div className={styles.container}>
      <h5 className={styles.title}>Sprint planning: <span className={styles.issues}>(issues: {title})</span></h5>
      <h6 className={styles.role}>Scrum muster:</h6>
      <div className={styles.playersContainer}>
      <Player user={dealer} isCurrentUser={currentUserId === dealer.id} isPlayer={false}/>
      </div>
    </div>
  )
}

export default AboutDealer;
