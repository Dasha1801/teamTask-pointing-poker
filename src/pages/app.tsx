import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { appSelectors, currentUserSelectors } from '../redux/selectors';
import { TUserRole } from '../redux/types';
import { APP_CONSTANTS } from '../shared/constants';
import styles from './app.module.scss';
import GameResult from './game-result/game-result';
import { GamePage } from './game/game-page-player/game-page';
import DealerLobby from './lobby/dealer-lobby/dealer-lobby';
import PlayerLobby from './lobby/player-lobby';
import Footer from './shared/footer/footer';
import Header from './shared/header/header';
import InfoMessageList from './shared/info-message-list/info-message-list';
import WelcomePage from './welcome/welcome';

function App(): JSX.Element {
  const currentUser = useSelector(currentUserSelectors.selectCurrentUser);
  const listMessages = useSelector(appSelectors.selectInfoMessages);

  return (
    <div className={styles.app}>
      <Router>
        <Header />
        <main className={styles.content}>
          <InfoMessageList messages={listMessages} />
          <TransitionGroup className={styles.transitionGroup}>
            <CSSTransition
              timeout={APP_CONSTANTS.ROUTER_TRANSITION_TIMEOUT}
              classNames="page"
            >
              <Switch>
                <Route path="/results">
                  <div>Results</div>
                </Route>
                <Route exact path="/">
                  <WelcomePage />
                </Route>
                <Route exact path="/game/result">
                  <GameResult />
                </Route>
                <Route path="/game/:gameId">
                  {currentUser.role === TUserRole.dealer ? (
                    <GamePage />
                  ) : (
                    <GamePage />
                  )}
                </Route>
                <Route path="/lobby/:gameId">
                  {currentUser.role === TUserRole.dealer ? (
                    <DealerLobby />
                  ) : (
                    <PlayerLobby />
                  )}
                </Route>
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
