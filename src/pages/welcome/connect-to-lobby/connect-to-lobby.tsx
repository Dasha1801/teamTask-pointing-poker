import styles from './connect-to-lobby.module.scss';
import React, { useRef, useState } from 'react';
import { Form, Row, Col, Container, InputGroup, FormControl, Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { TUserRole, User } from '../../../redux/types';
import { thunks } from '../../../redux/thunks/thunks';

type FormData = {
  firstName: string;
  lastName: string;
  jobPosition: string;
  base64: string | undefined;
  isObserver: boolean;
};

const ConnectToLobby = ():JSX.Element => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const inputFile = useRef<HTMLInputElement>(null);
  const image = useRef<HTMLImageElement>(null);
  const [fileName, setFileName] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [filePath, setFilePath] = useState<any>('');
  const [playerName, setPlayerName] = useState('NN');

  function toBase64String(img: HTMLImageElement | null): string | undefined {
    const c = document.createElement('canvas');
    let ctx, base64String
    if (img) {
      const minSide = Math.min(img.naturalHeight, img.naturalWidth);
      if (img.naturalHeight > minSide) {
        c.height = img.naturalHeight / minSide * 100
        c.width = 100
      } else {
        c.height = 100;
        c.width = img.naturalWidth / minSide * 100;
      }
      ctx = c.getContext('2d');
      if (ctx) ctx.drawImage(img, 0, 0, c.width, c.height);
      base64String = c.toDataURL(); //.replace(/^data:image.+;base64,/, '')
    }
    return base64String
  }

  const onSubmit = handleSubmit(data => {
    let base64String: string | undefined;
    if (image.current) base64String = toBase64String(image.current);
    (async function() {
      const currentUser = new User({
        id: '',
        role: data.isObserver ? TUserRole.observer : TUserRole.player,
        firstName: data.firstName,
        lastName: data.lastName,
        jobPosition: data.jobPosition,
        image: base64String,
      })
        await dispatch(thunks.addPlayerThunk({addedPlayer: currentUser}))
      })();
  });
  
  const handleChange = () => {
    if (inputFile.current?.files) {
      setFileName(inputFile.current.files[0].name);
      setFilePath(window.URL.createObjectURL(inputFile.current.files[0]));
    }
  }

  const handleChangeInput = handleSubmit(data => {
    if (fileName !== '') {  
    } else {  
      if (data.lastName === '') {
        setPlayerName(`${data.firstName.slice(0, 1).toUpperCase()}${data.firstName.slice(-1).toUpperCase()}`)
      } else if (data.lastName !== '') {
        setPlayerName(`${data.firstName.slice(0, 1).toUpperCase()}${data.lastName.slice(0, 1).toUpperCase()}`)
      }
    }
  });

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
                  <label className="form-check-label" htmlFor="isObserver">
                    <input className="form-check-input" type="checkbox" id="isObserver" 
                    {...register("isObserver")}
                    />
                  </label>
                </div>
              </div>
            </Container>
          </Col>
        </Row>
        <Row>
          <Col lg={7}>
            <Form.Label htmlFor="firstName" className={styles.label}>Your first name:</Form.Label>
            <InputGroup className="mb-3" onChange={handleChangeInput}>
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
              <InputGroup className="mb-3" onChange={handleChangeInput}>
                <FormControl id="lastName" aria-describedby="basic-addon3" 
                  {...register("lastName")}
                />
              </InputGroup>         
          </Col>
          <Col lg={2}>
          </Col>        
        </Row>  
        <Row> 
          <Col lg={7}>
            <Form.Label htmlFor="jobPosition" className={styles.label}>Your job position (optional):</Form.Label>
            <InputGroup className="mb-3">
              <FormControl id="jobPosition" aria-describedby="basic-addon3" {...register("jobPosition")}/>
            </InputGroup>          
          </Col>
          <Col lg={2}>
          </Col>
        </Row>
        <Row>
          <Col lg={7}>
            <Form.Label htmlFor="avatar" className={styles.label}>Image:</Form.Label>
            <InputGroup className={styles.field__wrapper} onChange={handleChange}>
              <FormControl
                className={styles.placeholder}
                value={fileName}
                placeholder="Choose footer"
                aria-describedby="basic-addon2"
                readOnly
              />
              <input 
                ref={inputFile}
                id="avatar" 
                type="file" 
                className={styles.field__file} 
              />
              <Form.Label 
                htmlFor="avatar"    
                className={styles.chooser} 
              >
                Browse
              </Form.Label>
            </InputGroup>
            <div className={styles.avatar} style={{background: `no-repeat center/cover url(${filePath}) #60DABF`}}>
              {filePath === '' && playerName}
              <img ref={image} src={filePath} alt="" style={{ display: "none" }} />
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

            
