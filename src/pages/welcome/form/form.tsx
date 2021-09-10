import styles from './form.module.scss';
import React, { ChangeEvent, useState } from 'react';
import logoGame from '../../../shared/assets/icons/logo.svg';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { APP_CONSTANTS } from '../../../shared/constants';
import { BasePopup } from '../../shared/base-popup/base-popup';
import { useDispatch } from 'react-redux';
import { thunks } from '../../../redux/thunks/thunks';
import { AppDispatch } from '../../../redux/store';

const FormWelcome = (): JSX.Element => {
  const [warn, setWarn] = useState('');
  const [url, setUrl] = useState('');
  const [isLobbyConnect, setLobbyConnect] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUrl(value);
    setWarn('');
  };

  const testUrl = (urlToTest: string): boolean => {
    const regexQuery = new RegExp(APP_CONSTANTS.URL_REGEXP);
    const test = regexQuery.test(urlToTest);
    if (!test) {
      setWarn('*incorrect URL!');
      return false;
    }
    return true;
  };

  const handleClickNewGame = async () => {
    await dispatch(thunks.connectThunk());
  };

  const handleClickConnect = () => {
    const validUrl = testUrl(url);
    if (validUrl) {
      setLobbyConnect(true);
    }
  };

  return (
    <div className={styles.container}>
      {isLobbyConnect && (
        <BasePopup
          contentProps={{ className: 'asd' }}
          headingText="Connect to lobby"
          buttonOkText="Confirm"
          buttonCancelText="Cancel"
          buttonCancelProps={{ onClick: () => setLobbyConnect(false) }}
        >
          Player settings
        </BasePopup>
      )}
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
