import styles from './connect-to-lobby.module.scss';
import React, { useRef, useState } from 'react';
import { Form, Row, Col, Container, InputGroup, FormControl, Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";

type FormData = {
  firstName: string;
};

const ConnectToLobby = ():JSX.Element => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const onSubmit = handleSubmit(data => alert(JSON.stringify(data)));
  const inputFile = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('Choose file');

  const handleChange = () => {
    if (inputFile.current?.files) {
      setFileName(inputFile.current.files[0].name);
    }  
  }

  return (
    <Form className={styles.connect} onSubmit={onSubmit}>
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
            <Form.Label htmlFor="firstName" className={styles.label}>Your first name:</Form.Label>
            <InputGroup className="mb-3">
              <FormControl id="firstName" aria-describedby="basic-addon3" 
                {...register("firstName", {
                  validate: {
                    noName: (value) => value !== '',
                    tooShort: (value) => value.length >= 3,
                    tooLong: (value) => value.length <= 20,
                  }  
                })}/>
            </InputGroup>
            {errors.firstName && errors.firstName.type === "tooShort" && (
              <p className={styles.tipError}>The name must not be less than 3 characters</p>
            )}
            {errors.firstName && errors.firstName.type === "tooLong" && (
              <p className={styles.tipError}>The name must not be more than 20 characters</p>
            )}     
          </Col>
          <Col lg={2} className={styles.tipError}>
            {errors.firstName && errors.firstName.type === "noName" && (
              <span>Enter your name</span>
            )}
          </Col>
        </ Row>
        <Row>
          <Col lg={7}>
            <Form.Label htmlFor="lastName" className={styles.label}>Your last name (optional):</Form.Label>
              <InputGroup className="mb-3">
                <FormControl id="lastName" aria-describedby="basic-addon3" />
              </InputGroup>         
          </Col>
          <Col lg={2}>
          </Col>        
        </Row>  
        <Row> 
          <Col lg={7}>
            <Form.Label htmlFor="jobPosition" className={styles.label}>Your job position (optional):</Form.Label>
            <InputGroup className="mb-3">
              <FormControl id="jobPosition" aria-describedby="basic-addon3" />
            </InputGroup>          
          </Col>
          <Col lg={2}>
          </Col>
        </Row>
        <Row>
          <Col lg={7}>
            <Form.Label htmlFor="fileChooser" className={styles.label}>Image:</Form.Label>
            <InputGroup className={styles.field__wrapper}>
              <FormControl
                className={styles.placeholder}
                placeholder={fileName}
                aria-describedby="basic-addon2"
                readOnly
              />
            <input id="fileChooser" type="file" ref={inputFile} className={styles.field__file} onChange={handleChange} />
              <Form.Label 
                htmlFor="fileChooser" 
                className={styles.chooser} 
              >
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
          <Button type="submit" className={styles.confirm}>Confirm</Button>
          <Button type="reset" className={styles.cancel}>Cancel</Button>
        </Container>
      </ Container>
    </Form>
  );
}

export default ConnectToLobby;

            
