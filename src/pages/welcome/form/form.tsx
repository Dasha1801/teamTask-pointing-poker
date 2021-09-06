import styles from './form.module.scss';
import React from 'react';
import logoGame from '../../../shared/assets/icons/logo.svg';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const FormWelcome = ():JSX.Element => {
  return(
    <div className={styles.container}>
      <div className={styles.wrapperLogo}>
        <img src={logoGame} className={styles.logo} alt='logo game'></img>
      </div>
    <Form className={styles.rootForm} >
      <Form.Group className='mb-3'>
        <Form.Label className={styles.label1}>Start your planning:</Form.Label>
        <div className={styles.wrapperBtnStart}>
          <Button type='button' className={styles.btn}>Start new game</Button>
        </div>
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label className={styles.label2}>OR:</Form.Label>
          <Form.Control type='url' placeholder='Connect to lobby by URL:' className={styles.input} />
          <Button type='button' className={styles.btn}>Connect</Button>
      </Form.Group>
    </Form>
    </div>
  )
}

export default FormWelcome;
