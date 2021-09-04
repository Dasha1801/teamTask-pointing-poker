import styles from './app.module.scss';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { appActions } from '../redux/slices/app/app-slice';
import { appSelectors } from '../redux/selectors';
import Header from './shared/header/header';

function App(): JSX.Element {
  const dispatch = useDispatch();
  const connectionStatus = useSelector(appSelectors.selectConnectionStatus);

  const onClick = () => {
    dispatch(appActions.changeConnectionStatus(!connectionStatus));
  };

  return (
    <div className={styles.app}>
      <Header/>
      <Router>
        <Button type="button" onClick={onClick}>
          Test
        </Button>
        <input type="text" value={String(connectionStatus)} />
      </Router>
    </div>
  );
}

export default App;
