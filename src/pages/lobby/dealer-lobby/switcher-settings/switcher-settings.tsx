import styles from './switcher-settings.module.scss';
import React from 'react';
import { Col, FormControl } from 'react-bootstrap';

const SwitcherSettings = (): JSX.Element => {
  return (
    <Col lg={2} className={styles.right}>
      <div className={`${styles.container} form-check form-switch`}>
        <FormControl
          className={`${styles.switcher} form-check-input`}
          type="checkbox"
        />
      </div>
    </Col>
  );
};

export default SwitcherSettings;
