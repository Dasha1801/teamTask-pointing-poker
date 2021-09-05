import styles from './connect-to-lobby.module.scss';
import React from 'react';
import { Form, Row, Col, Container, InputGroup, FormControl, Button } from 'react-bootstrap';

const ConnectToLobby = ():JSX.Element => {
  return (
    <Form className={styles.connect}>
      <Container className={styles.container}>
        <Row className={styles.rowTitle}>
          <Col lg={8} className={styles.left}>
            <h1 className={styles.title}>Connect to lobby</h1>
          </Col>
          <Col lg={2} className={styles.right}>
            <Container className={styles.observer}>
              <div className="form-check form-switch">
                <div className={styles.observerLabel}>Connect as<br />Observer 
                  <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                  </label>
                </div>
              </div>
            </Container>
          </Col>
        </Row>
        <Row>
          <Col lg={7}>
            <Form.Label htmlFor="first-name" className={styles.label}>Your first name:</Form.Label>
            <InputGroup className="mb-3">
              <FormControl id="first-name" aria-describedby="basic-addon3" />
            </InputGroup>
          </Col>
          <Col lg={2}>
          </Col>
        </ Row>
        <Row>
          <Col lg={7}>
            <Form.Label htmlFor="first-name" className={styles.label}>Your last name (optional):</Form.Label>
              <InputGroup className="mb-3">
                <FormControl id="first-name" aria-describedby="basic-addon3" />
              </InputGroup>         
          </Col>
          <Col lg={2}>
          </Col>        
        </Row>  

        <Row> 
          <Col lg={7}>
            <Form.Label htmlFor="first-name" className={styles.label}>Your job position (optional):</Form.Label>
            <InputGroup className="mb-3">
              <FormControl id="first-name" aria-describedby="basic-addon3" />
            </InputGroup>          
          </Col>
          <Col lg={2}>

          </Col>
        </Row>
        <Row>
          <Col lg={7}>
            <Form.Label htmlFor="fileChooser" className={styles.label}>Image:</Form.Label>
            <InputGroup className="mb-2">
              <FormControl
                className={styles.placeholder}
                placeholder="Choose file"
                aria-label="Choose file"
                aria-describedby="basic-addon2"
                readOnly
              />        
              <Form.Label htmlFor="fileChooser" className={styles.chooser}>
                Browse
              </Form.Label>
            </InputGroup>
            <div className={styles.avatar}>
              NN
            </div>
          </Col>
          <Col lg={2}>
          </Col>
        </Row>
        <Container className={styles.btnsRow}>
          <Button className={styles.confirm}>Confirm</Button>
          <Button className={styles.cancel}>Cancel</Button>
        </Container>
      </ Container>
    </Form>
  );
}

export default ConnectToLobby;
