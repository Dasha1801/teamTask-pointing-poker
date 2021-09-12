import styles from '../connect-to-lobby.module.scss';
import React from 'react';
import { Form, Row, Col, InputGroup, FormControl } from 'react-bootstrap';

interface IFirstNameProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reg: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any;
  handleChangeInput: () => void;
}

function FirstName(
  props: React.PropsWithChildren<IFirstNameProps>
): JSX.Element {
  const { reg, errors, handleChangeInput } = props;
  return (
    <Row>
      <Col lg={7}>
        <Form.Label htmlFor="firstName" className={styles.label}>
          Your first name:
        </Form.Label>
        <InputGroup className="mb-3" onChange={handleChangeInput}>
          <FormControl
            id="firstName"
            aria-describedby="basic-addon3"
            {...reg}
          />
        </InputGroup>
        {errors.firstName && errors.firstName.type === 'tooShort' && (
          <p className={styles.tipError}>
            The name must not be less than 3 characters
          </p>
        )}
        {errors.firstName && errors.firstName.type === 'tooLong' && (
          <p className={styles.tipError}>
            The name must not be more than 20 characters
          </p>
        )}
      </Col>
      <Col lg={2} className={styles.tipError}>
        {errors.firstName && errors.firstName.type === 'noName' && (
          <span>Enter your name</span>
        )}
      </Col>
    </Row>
  );
}

export default FirstName;
