import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gameSelectors } from '../../redux/selectors';
import { currentUserActions } from '../../redux/slices/currentUser/current-user-slice';
import { gameActions } from '../../redux/slices/game/game-slice';
import { Issue,  IUser,  TGameStatus, TUserRole, User } from '../../redux/types';
import AboutDealer  from './aboutDealer/aboutDealer';
import Members from './members/members';
import styles from './playerLobby.module.scss';

const PlayerLobby = ():JSX.Element => {
  const despatch = useDispatch();
  despatch(gameActions.changeIssues([new Issue({title: 'Planning 23'}).toObject(), new Issue({title: '85944425'}).toObject(), new Issue({title: 'ssssssssssss'}).toObject(), new Issue({title: '12345687889'}).toObject()]));

  despatch(gameActions.changePlayers([new User({role : TUserRole.dealer, firstName : 'John', jobPosition:'IOS Developer', lastName:'Tramp',image: 'https://www.liga.net/images/general/2019/02/14/20190214174619-9721.png', id:'1'}).toObject(), new User({role : TUserRole.player, firstName : 'Simon', lastName: 'Pit', id:'2'}).toObject(), new User({role : TUserRole.player, firstName : 'Ann',image: 'https://likeyou.io/wp-content/uploads/2019/02/Snimok-ekrana-2019-02-15-v-16.03.56.png', jobPosition:'FrontEnd Developer', id:'3'}).toObject(), new User({role : TUserRole.player, firstName : 'John', jobPosition:'IOS Developer',  id: '4', lastName:'Tramp',image: 'https://likeyou.io/wp-content/uploads/2019/02/Snimok-ekrana-2019-02-15-v-15.44.03.png'}).toObject(), new User({role : TUserRole.player, firstName : 'Simon', lastName: 'Pit', id:'5'}).toObject(), new User({role : TUserRole.player, firstName : 'Ann',image: 'https://likeyou.io/wp-content/uploads/2019/02/Snimok-ekrana-2019-02-15-v-16.03.56.png', jobPosition:'FrontEnd Developer', id:'6'}).toObject(), new User({role : TUserRole.player, firstName : 'Simon'}).toObject(), new User({role : TUserRole.observer, firstName : 'Jack',image: 'https://cdn.maximonline.ru/ec/5b/70/ec5b701b6dc90d27cbde89b6e19a0d07/728x728_1_848ca9ef388ee0fdc2c538677e5709a7@1024x1024_0xac120002_17992516771550233711.jpg', jobPosition:'FrontEnd Developer', id:'7'}).toObject(),]));

  despatch(gameActions.changeStatus(TGameStatus.lobby));

  despatch(currentUserActions.changeCurrentUser(new User({role : TUserRole.player, firstName : 'Simon', lastName: 'Pit', id:'2'}).toObject(),))

  const dealer = useSelector(gameSelectors.selectDealer) as IUser;
  const players = useSelector(gameSelectors.selectPlayers);
  const issue = useSelector(gameSelectors.selectIssues);

     return(
    <div className={styles.wrapper}>
      <AboutDealer info={{dealer, issue}}/>
      <Members users={players}/>
    </div>
  )
}

export default PlayerLobby;
