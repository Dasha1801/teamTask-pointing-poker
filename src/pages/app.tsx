import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { sideBarSelectors } from '../redux/selectors/side-bar-selectors';
import styles from './app.module.scss';
import Footer from './shared/footer/footer';
import Header from './shared/header/header';
import WelcomePage from './welcome/welcome';


function App(): JSX.Element {
  const sideBar = useSelector(sideBarSelectors.selectSideBar).isShowSideBar;
  return (
    <div className={styles.app}>
      <Header sideBarShow={sideBar}/>
      <Router>
        <main className={styles.content}>
          <WelcomePage />
        </main>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
