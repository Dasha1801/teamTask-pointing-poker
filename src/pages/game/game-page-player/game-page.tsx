import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
  currentUserSelectors,
  gamePageSelectors,
  gameSelectors,
  gameSettingsSelectors,
  votingKickSelectors,
} from '../../../redux/selectors';
import { entryRequestSelectors } from '../../../redux/selectors/entry-request-selectors';
import { entryRequestsActions } from '../../../redux/slices/entry-requests/entry-requests';
import { thunks } from '../../../redux/thunks/thunks';
import { IUser, TGameStatus, TUserRole, User } from '../../../redux/types';
import { BasePopup } from '../../shared/base-popup/base-popup';
import DealerSection from '../../shared/dealer-section/dealer-section';
import SprintHeading from '../../shared/sprint-heading/sprint-heading';
import Deck from '../cards/deck';
import GameControls from '../game-controls/game-controls';
import SideBar from '../side-bar/side-bar';
import IssueStatistics from '../statistics/issue-statistics';
import styles from './game-page.module.scss';

export function GamePage(): JSX.Element {
  const history = useHistory();
  const dispatch = useDispatch();
  const isSideBarShown = useSelector(gamePageSelectors.selectIsSideBarShown);
  const gameStatus = useSelector(gameSelectors.selectStatus);
  const gameId = useSelector(gameSelectors.selectId);
  const [lastGameStatus, setLastGameStatus] = useState(gameStatus);
  const issues = useSelector(gameSelectors.selectIssues);
  const dealer = useSelector(gameSelectors.selectDealer) as IUser;
  const currentIssue = useSelector(gameSelectors.selectCurrentIssue);
  const firstRender = useRef<boolean>(true);
  const gameSettings = useSelector(gameSettingsSelectors.selectSettings);
  const currentUser = useSelector(currentUserSelectors.selectCurrentUser);
  const entryRequest = useSelector(entryRequestSelectors.selectFirstRequest);
  const [showRoundResult, setShowRoundResult] = useState(false);
  const votingKick = useSelector(votingKickSelectors.selectVotingKick);
  const [showVotingPopup, setShowVotingPopup] = useState(false);

  useEffect(() => {
    console.log(entryRequest);
  });

  useEffect(() => {
    console.log('cur changed');

    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    (async () => {
      if (currentIssue && currentUser.id === dealer.id) {
        await dispatch(
          thunks.startRoundThunk({
            dealerId: currentUser.id,
            issueId: currentIssue.id,
            gameId,
          })
        );
      }
    })();
  }, [currentIssue?.id]);

  useEffect(() => {
    switch (gameStatus) {
      case TGameStatus.inactive:
        history.replace('/');
        break;
      case TGameStatus.started:
        if (lastGameStatus === TGameStatus.roundInProgress) {
          setLastGameStatus(TGameStatus.started);
          setShowRoundResult(true);
        }
        break;
      case TGameStatus.roundInProgress:
        setLastGameStatus(TGameStatus.roundInProgress);
        setShowRoundResult(false);
        break;
      default:
        break;
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
    <div className={styles.container}>
      {showVotingPopup && (
        <BasePopup
          headingText="Kick player"
          buttonOkText="Yes"
          buttonCancelText="No"
          buttonOkProps={{ onClick: acceptKickVote }}
          buttonCancelProps={{ onClick: declineKickVote }}
        ></BasePopup>
      )}
      {entryRequest && (
        <BasePopup
          buttonOkText="Admit"
          buttonCancelText="Reject"
          buttonCancelProps={{
            onClick: async () => {
              await dispatch(thunks.rejectPlayerThunk({ gameId }));
              dispatch(entryRequestsActions.popEntryRequest());
            },
          }}
          buttonOkProps={{
            onClick: async () => {
              await dispatch(thunks.admitPlayerThunk({ gameId }));
              dispatch(entryRequestsActions.popEntryRequest());
            },
          }}
        >
          {`Admit ${User.getFullName(
            entryRequest.firstName as string,
            entryRequest.lastName
          )}?`}
        </BasePopup>
      )}
      {gameStatus !== TGameStatus.inactive && (
        <div
          className={`${styles.content} ${
            isSideBarShown ? styles.contentWithSidebar : ''
          }`}
        >
          <div className={styles.heading}>
            <SprintHeading issues={issues} />
          </div>
          <DealerSection dealer={dealer} />
          <div className={styles.controls}>
            <GameControls />
          </div>
          <div className={styles.main}>
            {showRoundResult && currentIssue?.lastRoundResult && (
              <div className={styles.statistics}>
                <h4 className={styles.statisticsHeading}>Statistics</h4>
                <IssueStatistics issue={currentIssue} />
              </div>
            )}
          </div>

          <div className={styles.deck}>
            {((gameSettings.canScoreAfterFlip &&
              Object.keys(currentIssue?.lastRoundResult || {}).length > 0) ||
              (gameStatus === TGameStatus.roundInProgress &&
                !(
                  currentUser.role === TUserRole.dealer &&
                  !gameSettings.canDealerPlay
                ))) && <Deck typeOfDeck={gameSettings.cardType} />}
          </div>
        </div>
      )}
      {isSideBarShown && <SideBar />}
    </div>
  );
}
