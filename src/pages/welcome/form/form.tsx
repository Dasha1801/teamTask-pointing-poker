import styles from './form.module.scss';
import React, { ChangeEvent, useState } from 'react';
import logoGame from '../../../shared/assets/icons/logo.svg';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { APP_CONSTANTS } from '../../../shared/constants';

const FormWelcome = (): JSX.Element => {
  const [warn, setWarn] = useState('');
  const [url, setUrl] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUrl(value);
    setWarn('');
  };

  const testUrl = () => {
    const value = url;
    const regexQuery = new RegExp(APP_CONSTANTS.URL_REGEXP);
    const test = regexQuery.test(value);
    if (!test) {
      setWarn('*incorrect URL!');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapperLogo}>
        <img src={logoGame} className={styles.logo} alt="logo game"></img>
      </div>
      <Form className={styles.rootForm}>
        <Form.Group className="mb-3">
          <Form.Label className={styles.label1}>
            Start your planning:
          </Form.Label>
          <div className={styles.wrapperBtnStart}>
            <Button type="button" className={styles.btn}>
              Start new game
            </Button>
          </div>
        </Form.Group>
        <Form.Group className={`mb-3 ${styles.wrapUrl}`}>
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
            onClick={testUrl}
            data-testid="btn"
          >
            Connect
          </Button>
        </Form.Group>
        <span className={styles.warning}>{warn}</span>
      </Form>
    </div>
  );
};

export default FormWelcome;
