import styles from './app.module.scss';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Header from './shared/header/header';
import Footer from './shared/footer/footer';
import WelcomePage from './welcome/welcome';
import { APP_CONSTANTS } from '../shared/constants';

function App(): JSX.Element {
  return (
    <div className={styles.app}>
      <Header />
      <Router>
        <main className={styles.content}>
          <TransitionGroup className="transition-group">
            <CSSTransition
              timeout={APP_CONSTANTS.ROUTER_TRANSITION_TIMEOUT}
              classNames="page"
            >
              <Switch>
                <Route exact path="/">
                  <WelcomePage />
                </Route>
                <Route path="/lobby/:gameId">
                  <div>Lobby page</div>
                </Route>
                <Route path="/game/:gameId">
                  <div>Game page</div>
                </Route>
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </main>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
