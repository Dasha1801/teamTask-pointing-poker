import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
  currentUserSelectors,
  gameSelectors,
  votingKickSelectors,
} from '../../redux/selectors';
import { lobbyPageSelectors } from '../../redux/selectors/lobby-page-selectors';
import { thunks } from '../../redux/thunks/thunks';
import { TGameStatus } from '../../redux/types';
import { BasePopup } from '../shared/base-popup/base-popup';
import SideBar from '../shared/side-bar/side-bar';
import SprintHeading from '../shared/sprint-heading/sprint-heading';
import AboutDealer from './about-dealer/about-dealer';
import Members from './members/members';
import styles from './player-lobby.module.scss';

const PlayerLobby = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showVotingPopup, setShowVotingPopup] = useState(false);
  const sideBar = useSelector(lobbyPageSelectors.selectIsSideBarShown);
  const users = useSelector(gameSelectors.selectPlayers);
  const messages = useSelector(gameSelectors.selectGame).messages;
  const messagesIds = new Set(messages.map((item) => item.id));
  const issues = useSelector(gameSelectors.selectIssues);
  const wasKicked = useSelector(currentUserSelectors.selectCurrentUser).kicked;
  const gameCancelled = useSelector(lobbyPageSelectors.selectGameCancelled);
  const gameStatus = useSelector(gameSelectors.selectStatus);
  const gameId = useSelector(gameSelectors.selectId);
  const votingKick = useSelector(votingKickSelectors.selectVotingKick);
  const currentUser = useSelector(currentUserSelectors.selectCurrentUser);

  useEffect(() => {
    if (wasKicked) {
      history.push('/');
    }
  }, [wasKicked]);

  useEffect(() => {
    if (gameCancelled) {
      history.push('/');
    }
  }, [gameCancelled]);

  useEffect(() => {
    if (gameStatus === TGameStatus.started) {
      history.push(`/game/${gameId}`);
    }
  }, [gameStatus]);

  useEffect(() => {
    if (votingKick.kickedPlayerId) {
      setShowVotingPopup(true);
    }
  }, [votingKick.kickedPlayerId]);

  const declineKickVote = async () => {
    await dispatch(
      thunks.voteToKickThunk({
        votingPlayerId: currentUser.id,
        gameId,
        kickedPlayerId: votingKick.kickedPlayerId,
        accept: false,
      })
    );
    setShowVotingPopup(false);
  };

  const acceptKickVote = async () => {
    await dispatch(
      thunks.voteToKickThunk({
        votingPlayerId: currentUser.id,
        gameId,
        kickedPlayerId: votingKick.kickedPlayerId,
        accept: true,
      })
    );
    setShowVotingPopup(false);
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
        ></BasePopup>
      )}
      <div className={styles.wrapper}>
        <SprintHeading issues={issues} />
        <AboutDealer />
        <Members users={users} />
      </div>
      {sideBar ? (
        <div className={styles.sideBar}>
          <SideBar
            message={{
              messagesProps: messages,
              users: users.filter((user) => messagesIds.has(user.id)),
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default PlayerLobby;
