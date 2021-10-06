import React from 'react';
import { Col, Container } from 'react-bootstrap';
import styles from './heading-title.module.scss';

function HeadingTitle(): JSX.Element {
  return (
    <Col lg={2} className={styles.right}>
      <Container className={styles.dealer}>
        <div>
          <div className={styles.dealerLabel}>as Dealer</div>
        </div>
      </Container>
    </Col>
  );
}

export default HeadingTitle;
