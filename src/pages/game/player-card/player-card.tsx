import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserSelectors, gameSelectors } from '../../../redux/selectors';
import { appActions } from '../../../redux/slices/app/app-slice';
import { AppDispatch } from '../../../redux/store';
import { thunks } from '../../../redux/thunks/thunks';
import { IRequestResult, IUser, TUserRole } from '../../../redux/types';
import {
  InfoMessage,
  TInfoMessageType,
} from '../../../redux/types/info-message';
import removeUser from '../../../shared/assets/icons/remove-user.svg';
import { BasePopup } from '../../shared/base-popup/base-popup';
import styles from './player-card.module.scss';

export interface IPlayerCardProps {
  user: IUser;
  customClass?: string;
}

const PlayerCard = ({ user, customClass }: IPlayerCardProps): JSX.Element => {
  const MIN_NUMBER_OF_PLAYERS_TO_VOTE = 3;
  const dispatch = useDispatch<AppDispatch>();
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
    const response = await dispatch(
      thunks.kickPlayerThunk({
        dealerId: currentUser.id,
        kickedPlayerId: user.id,
        gameId,
      })
    );
    handleCloseKickPopup();
    const payload = response.payload as Partial<IRequestResult>;
    if (payload.message) {
      dispatch(
        appActions.addOneInfoMessage(
          new InfoMessage(payload.message, TInfoMessageType.error).toObject()
        )
      );
      return;
    }
  };

  const startVotingToKick = async () => {
    const response = await dispatch(
      thunks.startVotingToKickThunk({
        votingPlayerId: currentUser.id,
        kickedPlayerId: user.id,
        gameId,
      })
    );
    handleCloseKickPopup();
    const payload = response.payload as Partial<IRequestResult>;
    if (payload.message) {
      dispatch(
        appActions.addOneInfoMessage(
          new InfoMessage(payload.message, TInfoMessageType.error).toObject()
        )
      );
      return;
    }
  };

  return (
    <div className={`${styles.card} ${customClass || ''}`}>
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
        <div className={styles.avatarContainer}>
          <div className={styles.avatar}>
            {getName(user.firstName, user?.lastName)}
          </div>
        </div>
      )}
      <div className={styles.info}>
        {currentUser.id === user.id && (
          <div className={styles.currentUser}>It`s you</div>
        )}
        <div className={styles.name}>
          {user?.firstName} {user?.lastName}
        </div>
        <div className={styles.jobPosition}>{user?.jobPosition}</div>
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
