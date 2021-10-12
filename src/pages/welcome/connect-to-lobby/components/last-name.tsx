import styles from '../connect-to-lobby.module.scss';
import React from 'react';
import {
  Form,
  Row,
  Col,
  InputGroup,
  FormControl,
  FormControlProps,
} from 'react-bootstrap';

interface ILastNameProps {
  reg: FormControlProps;
  handleChangeInput: () => void;
}

function LastName({
  reg,
  handleChangeInput,
}: React.PropsWithChildren<ILastNameProps>): JSX.Element {
  return (
    <Row>
      <Col lg={7}>
        <Form.Label htmlFor="lastName" className={styles.label}>
          Your last name (optional):
        </Form.Label>
        <InputGroup onChange={handleChangeInput}>
          <FormControl id="lastName" aria-describedby="basic-addon3" {...reg} />
        </InputGroup>
      </Col>
      <Col lg={2}></Col>
    </Row>
  );
}

export default LastName;
