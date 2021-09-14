import styles from './form.module.scss';
import React, { ChangeEvent, useState } from 'react';
import logoGame from '../../../shared/assets/icons/logo.svg';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { APP_CONSTANTS } from '../../../shared/constants';
import { useDispatch } from 'react-redux';
import { thunks } from '../../../redux/thunks/thunks';
import { AppDispatch } from '../../../redux/store';
import ConnectToLobby from '../connect-to-lobby/connect-to-lobby';
import { ICheckGameResponse } from '../../../shared/services/types';
import CreateGame from '../create-game/create-game';

const FormWelcome = (): JSX.Element => {
  const [warn, setWarn] = useState('');
  const [url, setUrl] = useState('http://www.poker.ru/lobby/123');
  const [gameId, setGameId] = useState('');
  const [isLobbyConnect, setLobbyConnect] = useState(false);
  const [isNewGame, setNewGame] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUrl(value);
    setWarn('');
  };

  const testUrl = (urlToTest: string): boolean => {
    const urlQuery = new RegExp(APP_CONSTANTS.URL_REGEXP);
    const gameUrlQuery = new RegExp(APP_CONSTANTS.GAME_URL_REGEXP);
    const test = urlQuery.test(urlToTest) && gameUrlQuery.test(urlToTest);
    if (!test) {
      setWarn('*incorrect URL!');
      return false;
    }
    return true;
  };

  const handleClickNewGame = async () => {
    // await dispatch(thunks.connectThunk());
    setNewGame(true);
  };

  const handleClickConnect = async () => {
    const validUrl = testUrl(url);
    if (validUrl) {
      const gameIdLocal = url.split('/').slice(-1)[0];
      const response = await dispatch(
        thunks.checkGameThunk({ gameId: gameIdLocal })
      );
      const { gameExists } = response.payload as ICheckGameResponse;
      setLobbyConnect(gameExists);
      if (!gameExists) {
        setWarn(`Game with id '${gameId} is not found'`);
      } else {
        setGameId(gameIdLocal);
      }
    }
  };

  return (
    <div className={styles.container}>
      {isLobbyConnect && (
        <ConnectToLobby
          gameId={gameId}
          onCancelClick={() => setLobbyConnect(false)}
        />
      )}
      {isNewGame && <CreateGame onCancelClick={() => setNewGame(false)} />}
      <div className={styles.wrapperLogo}>
        <img src={logoGame} className={styles.logo} alt="logo game"></img>
      </div>
      <Form className={styles.rootForm}>
        <Form.Group>
          <Form.Label className={styles.label1}>
            Start your planning:
          </Form.Label>
          <div className={styles.wrapperBtnStart}>
            <Button
              type="button"
              className={styles.btn}
              onClick={handleClickNewGame}
            >
              Start new game
            </Button>
          </div>
        </Form.Group>
        <Form.Group className={styles.connection}>
          <Form.Label className={styles.label2}>OR:</Form.Label>
          <Form.Control
            type="url"
            placeholder="Connect to lobby by URL:"
            value={url}
            className={styles.input}
            onChange={handleChange}
          />
          <Button
            type="button"
            className={styles.btn}
            onClick={handleClickConnect}
            data-testid="btn"
          >
            Connect
          </Button>
          <span className={styles.warning}>{warn}</span>
        </Form.Group>
      </Form>
    </div>
  );
};

export default FormWelcome;
