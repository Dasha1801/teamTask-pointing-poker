import styles from './app.module.scss';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './shared/header/header';
import Footer from './shared/footer/footer';
import WelcomePage from './welcome/welcome';


function App(): JSX.Element {
  return (
    <div className={styles.app}>
      <Header />
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
