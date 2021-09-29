import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserSelectors, gameSelectors } from '../../../redux/selectors';
import { thunks } from '../../../redux/thunks/thunks';
import { IUser, TUserRole } from '../../../redux/types';
import removeUser from '../../../shared/assets/icons/remove-user.svg';
import { BasePopup } from '../../shared/base-popup/base-popup';
import styles from './player-card.module.scss';

export interface IPlayerCardProps {
  user: IUser;
  customClass?: string;
}

const PlayerCard = ({ user }: IPlayerCardProps): JSX.Element => {
  const MIN_NUMBER_OF_PLAYERS_TO_VOTE = 3;
  const dispatch = useDispatch();
  const gameId = useSelector(gameSelectors.selectId);
  const currentUser = useSelector(currentUserSelectors.selectCurrentUser);
  const dealer = useSelector(gameSelectors.selectDealer) as IUser;
  const [showDealerKickPopup, setDealerKickPopup] = useState(false);
  const [showPlayerKickPopup, setPlayerKickPopup] = useState(false);
  const players = useSelector(gameSelectors.selectPlayers);
  const canKick =
    currentUser.id !== user.id &&
    ((currentUser.role !== TUserRole.observer &&
      players.length > MIN_NUMBER_OF_PLAYERS_TO_VOTE &&
      user.role !== TUserRole.dealer) ||
      currentUser.role === TUserRole.dealer);

  const getName = (a: string, b: string | undefined): string => {
    let str = '';
    str += a.slice(0, 1);
    if (b != undefined) {
      str += b.slice(0, 1);
    }
    return str;
  };

  const handleClickKick = () => {
    if (currentUser.id === dealer.id) {
      setDealerKickPopup(true);
    } else {
      setPlayerKickPopup(true);
    }
  };

  const handleCloseKickPopup = () => {
    setDealerKickPopup(false);
    setPlayerKickPopup(false);
  };

  const kick = async () => {
    await dispatch(
      thunks.kickPlayerThunk({
        dealerId: currentUser.id,
        kickedPlayerId: user.id,
        gameId,
      })
    );
    handleCloseKickPopup();
  };

  const startVotingToKick = async () => {
    await dispatch(
      thunks.startVotingToKickThunk({
        votingPlayerId: currentUser.id,
        kickedPlayerId: user.id,
        gameId,
      })
    );
    handleCloseKickPopup();
  };

  return (
    <div className={`${styles.card}`}>
      {showDealerKickPopup && (
        <BasePopup
          headingText="Kick player"
          buttonOkText="Kick"
          buttonCancelText="Cancel"
          buttonOkProps={{ onClick: kick }}
          buttonCancelProps={{ onClick: handleCloseKickPopup }}
        >
          <div className={styles.dealerKickPopup}>
            {`Kick ${user.firstName} ${user.lastName} from the game?`}
          </div>
        </BasePopup>
      )}
      {showPlayerKickPopup && (
        <BasePopup
          headingText="Kick player"
          buttonOkText="Kick"
          buttonCancelText="Cancel"
          buttonOkProps={{ onClick: startVotingToKick }}
          buttonCancelProps={{ onClick: handleCloseKickPopup }}
        >
          <div className={styles.dealerKickPopup}>
            {`Vote to kick ${user.firstName} ${user.lastName} from the game?`}
          </div>
        </BasePopup>
      )}
      {user?.image ? (
        <img className={styles.img} src={user?.image}></img>
      ) : (
        <div className={styles.avatar}>
          {getName(user.firstName, user?.lastName)}
        </div>
      )}
      <div className={styles.name}>
        {currentUser.id === user.id && (
          <h6 className={styles.currentUser}>It`s you</h6>
        )}
        <h5 className={styles.h5}>
          {user?.firstName} {user?.lastName}
        </h5>
        <h6 className={styles.h6}>{user?.jobPosition}</h6>
      </div>
      {canKick && (
        <button className={styles.remove} onClick={handleClickKick}>
          <img src={removeUser} className={styles.removeImg} alt="Kick" />
        </button>
      )}
    </div>
  );
};

export default PlayerCard;
