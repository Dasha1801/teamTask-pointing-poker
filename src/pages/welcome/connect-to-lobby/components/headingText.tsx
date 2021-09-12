import styles from '../connect-to-lobby.module.scss';
import React from 'react';
import { Col } from 'react-bootstrap';

function HeadingText(): JSX.Element {
  return (
    <Col lg={8} className={styles.left}>
      <h1 className={styles.title}>Connect to lobby</h1>
    </Col>
  );
}

export default HeadingText;
