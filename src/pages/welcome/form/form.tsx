import styles from './form.module.scss';
import React, { ChangeEvent, useState } from 'react';
import logoGame from '../../../shared/assets/icons/logo.svg';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { APP_CONSTANTS } from '../../../shared/constants';
import { BasePopup } from '../../shared/base-popup/base-popup';

const FormWelcome = (): JSX.Element => {
  const [warn, setWarn] = useState('');
  const [url, setUrl] = useState('');
  const [isConnect, setConnect] = useState(false);

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

  const handleClickNewGame = () => {
    console.log('new game');
  };

  const handleClickConnect = () => {
    const validUrl = testUrl(url);
    if (validUrl) {
      setConnect(true);
    }
  };

  return (
    <div className={styles.container}>
      {isConnect && (
        <BasePopup
          heading="Connect to lobby"
          buttonOkText="Confirm"
          buttonCancelText="Cancel"
          buttonCancelProps={{ onClick: () => setConnect(false) }}
        >
          New game settings
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
