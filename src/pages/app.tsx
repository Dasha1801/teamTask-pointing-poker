import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { appSelectors, currentUserSelectors } from '../redux/selectors';
import { TUserRole } from '../redux/types';
import { APP_CONSTANTS } from '../shared/constants';
import styles from './app.module.scss';
import ErrorBoundary from './error-boundary';
import GameResult from './game-result/game-result';
import { GamePage } from './game/game-page';
import DealerLobby from './lobby/dealer-lobby/dealer-lobby';
import PlayerLobby from './lobby/player-lobby';
import Footer from './shared/footer/footer';
import Header from './shared/header/header';
import InfoMessageList from './shared/info-message-list/info-message-list';
import LoadSpinner from './shared/spinner/spinner';
import WelcomePage from './welcome/welcome';

function App(): JSX.Element {
  const currentUser = useSelector(currentUserSelectors.selectCurrentUser);
  const isLoading = useSelector(appSelectors.selectIsLoading);

  return (
    <div className={styles.app}>
      <ErrorBoundary>
        <Router>
          <Header />
          <main className={styles.content}>
            <InfoMessageList />
            {isLoading && <LoadSpinner />}
            <TransitionGroup className={styles.transitionGroup}>
              <CSSTransition
                timeout={APP_CONSTANTS.ROUTER_TRANSITION_TIMEOUT}
                classNames="page"
              >
                <Switch>
                  <Route exact path="/">
                    <WelcomePage />
                  </Route>
                  <Route path="/game-result/">
                    <GameResult />
                  </Route>
                  <Route path="/game/:gameId">
                    <GamePage />
                  </Route>
                  <Route path="/lobby/:gameId">
                    {currentUser.role === TUserRole.dealer ? (
                      <DealerLobby />
                    ) : (
                      <PlayerLobby />
                    )}
                  </Route>
                  <Route path="*">
                    <WelcomePage />
                  </Route>
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          </main>
          <Footer />
        </Router>
      </ErrorBoundary>
    </div>
  );
}

export default App;
