import styles from '../connect-to-lobby.module.scss';
import React from 'react';
import { Form, Row, Col, InputGroup, FormControl } from 'react-bootstrap';

interface ILastNameProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reg: any;
  handleChangeInput: () => void;
}

function LastName(props: React.PropsWithChildren<ILastNameProps>): JSX.Element {
  const { reg, handleChangeInput } = props;
  return (
    <Row>
      <Col lg={7}>
        <Form.Label htmlFor="lastName" className={styles.label}>
          Your last name (optional):
        </Form.Label>
        <InputGroup className="mb-3" onChange={handleChangeInput}>
          <FormControl id="lastName" aria-describedby="basic-addon3" {...reg} />
        </InputGroup>
      </Col>
      <Col lg={2}></Col>
    </Row>
  );
}

export default LastName;
