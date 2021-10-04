import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
  currentUserSelectors,
  gameSelectors,
  votingKickSelectors,
} from '../../redux/selectors';
import { lobbyPageSelectors } from '../../redux/selectors/lobby-page-selectors';
import { appActions } from '../../redux/slices/app/app-slice';
import { AppDispatch } from '../../redux/store';
import { thunks } from '../../redux/thunks/thunks';
import { IRequestResult, TGameStatus } from '../../redux/types';
import { InfoMessage, TInfoMessageType } from '../../redux/types/info-message';
import { BasePopup } from '../shared/base-popup/base-popup';
import SideBar from '../shared/side-bar/side-bar';
import SprintHeading from '../shared/sprint-heading/sprint-heading';
import AboutDealer from './about-dealer/about-dealer';
import Members from './members/members';
import styles from './player-lobby.module.scss';

const PlayerLobby = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const [showVotingPopup, setShowVotingPopup] = useState(false);
  const sideBar = useSelector(lobbyPageSelectors.selectIsSideBarShown);
  const users = useSelector(gameSelectors.selectPlayers);
  const messages = useSelector(gameSelectors.selectGame).messages;
  const issues = useSelector(gameSelectors.selectIssues);
  const wasKicked = useSelector(currentUserSelectors.selectCurrentUser).kicked;
  const gameCancelled = useSelector(lobbyPageSelectors.selectGameCancelled);
  const gameStatus = useSelector(gameSelectors.selectStatus);
  const gameId = useSelector(gameSelectors.selectId);
  const votingKick = useSelector(votingKickSelectors.selectVotingKick);
  const currentUser = useSelector(currentUserSelectors.selectCurrentUser);
  const kickPlayer = users.find(
    (user) => user.id === votingKick.kickedPlayerId
  );

  const [messageUserIds, setMessageUserIds] = useState(new Set());

  useEffect(() => {
    setMessageUserIds(new Set(messages.map((item) => item.userId)));
  }, [messages]);

  useEffect(() => {
    if (wasKicked) {
      history.replace('/');
    }
  }, [wasKicked]);

  useEffect(() => {
    if (gameCancelled) {
      history.replace('/');
    }
  }, [gameCancelled]);

  useEffect(() => {
    if (gameStatus === TGameStatus.started) {
      history.replace(`/game/${gameId}`);
    }
  }, [gameStatus]);

  useEffect(() => {
    if (votingKick.kickedPlayerId) {
      setShowVotingPopup(true);
    }
  }, [votingKick.kickedPlayerId]);

  const handleExit = async () => {
    history.push('/');
    const response = await dispatch(
      thunks.leaveGameThunk({ playerId: currentUser.id, gameId })
    );
    const payload = response.payload as Partial<IRequestResult>;
    if (payload.message) {
      dispatch(
        appActions.addOneInfoMessage(
          new InfoMessage(payload.message, TInfoMessageType.error).toObject()
        )
      );
      return;
    }
    dispatch(
      appActions.changeInfoMessages([new InfoMessage('You have left the game')])
    );
  };
  const declineKickVote = async () => {
    const response = await dispatch(
      thunks.voteToKickThunk({
        votingPlayerId: currentUser.id,
        gameId,
        kickedPlayerId: votingKick.kickedPlayerId,
        accept: false,
      })
    );
    setShowVotingPopup(false);
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

  const acceptKickVote = async () => {
    const response = await dispatch(
      thunks.voteToKickThunk({
        votingPlayerId: currentUser.id,
        gameId,
        kickedPlayerId: votingKick.kickedPlayerId,
        accept: true,
      })
    );
    setShowVotingPopup(false);
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
    <div className={styles.rootContainer}>
      {showVotingPopup && (
        <BasePopup
          headingText="Kick player"
          buttonOkText="Yes"
          buttonCancelText="No"
          buttonOkProps={{ onClick: acceptKickVote }}
          buttonCancelProps={{ onClick: declineKickVote }}
        >
          <div className={styles.dealerKickPopup}>
            Kick
            <span className={styles.nameKickPlayer}>
              {` ${kickPlayer?.firstName} ${kickPlayer?.lastName} `}
            </span>
            from the game?
          </div>
        </BasePopup>
      )}
      <div className={styles.wrapper}>
        <SprintHeading issues={issues} />
        <AboutDealer />
        <div className={styles.btnExitContainer}>
          <Button type="button" className={styles.btnExit} onClick={handleExit}>
            Exit
          </Button>
        </div>
        <Members users={users} />
      </div>
      {sideBar ? (
        <div className={styles.sideBar}>
          <SideBar
            messages={messages}
            users={users.filter((user) => messageUserIds.has(user.id))}
          />
        </div>
      ) : null}
    </div>
  );
};

export default PlayerLobby;
