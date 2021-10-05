import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { gameService } from '../..';
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
  const isSideBarShown = useSelector(lobbyPageSelectors.selectIsSideBarShown);
  const users = useSelector(gameSelectors.selectPlayers);
  const issues = useSelector(gameSelectors.selectIssues);
  const gameStatus = useSelector(gameSelectors.selectStatus);
  const gameId = useSelector(gameSelectors.selectId);
  const votingKick = useSelector(votingKickSelectors.selectVotingKick);
  const currentUser = useSelector(currentUserSelectors.selectCurrentUser);
  const kickPlayer = users.find(
    (user) => user.id === votingKick.kickedPlayerId
  );

  useEffect(() => {
    console.log('status change', gameStatus);

    if (gameStatus === TGameStatus.started) {
      history.replace(`/game/${gameId}`);
    } else if (gameStatus !== TGameStatus.lobby) {
      history.replace('/');
      gameService.resetState();
    }
  }, [gameStatus]);

  useEffect(() => {
    if (votingKick.kickedPlayerId) {
      setShowVotingPopup(true);
    }
  }, [votingKick.kickedPlayerId]);

  const handleExit = async () => {
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
    <div className={styles.container}>
      <div
        className={`${styles.content} ${
          isSideBarShown ? styles.contentWithSidebar : ''
        }`}
      >
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
        <div className={styles.titleSprint}>
          <SprintHeading issues={issues} />
        </div>
        <AboutDealer />
        <div className={styles.btnExitContainer}>
          <Button type="button" className={styles.btnExit} onClick={handleExit}>
            Exit
          </Button>
        </div>
        <Members users={users} />
      </div>
      {isSideBarShown && <SideBar />}
    </div>
  );
};

export default PlayerLobby;
