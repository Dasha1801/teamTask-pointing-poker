import styles from '../connect-to-lobby.module.scss';
import React from 'react';
import { Col, Container } from 'react-bootstrap';
import { IUseFormProps } from '../../../../redux/types/connect-to-lobby';

function Switcher(props: React.PropsWithChildren<IUseFormProps>): JSX.Element {
  const { reg } = props;
  return (
    <Col lg={2} className={styles.right}>
      <Container className={styles.observer}>
        <div className="form-check form-switch">
          <div className={styles.observerLabel}>
            Connect as
            <br />
            Observer
            <label className="form-check-label" htmlFor="isObserver">
              <input
                className="form-check-input"
                type="checkbox"
                id="isObserver"
                {...reg}
              />
            </label>
          </div>
        </div>
      </Container>
    </Col>
  );
}

export default Switcher;
