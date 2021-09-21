import lobbyStyles from '../../connect-to-lobby.module.scss';
import styles from './switcher.module.scss';
import React from 'react';
import { Col, Container, FormControl, FormControlProps } from 'react-bootstrap';


interface ISwitcherProps {
  reg: FormControlProps;
}

function Switcher(props: React.PropsWithChildren<ISwitcherProps>): JSX.Element {
  return (
    <Col lg={2} className={lobbyStyles.right}>
      <Container className={lobbyStyles.observer}>
        <div className="form-check form-switch">
          <div className={lobbyStyles.observerLabel}>
            Connect as
            <br />
            Observer
            <label className="form-check-label" htmlFor="isObserver">
              <FormControl
                className={`${styles.switcher} form-check-input`}
                type="checkbox"
                id="isObserver"
                {...props}
              />
            </label>
          </div>
        </div>
      </Container>
    </Col>
  );
}

export default Switcher;
