import styles from './base-button.module.scss';
import React, { ButtonHTMLAttributes } from 'react';
import Button from 'react-bootstrap/Button';

export function BaseButton(
  props: ButtonHTMLAttributes<HTMLButtonElement>
): JSX.Element {
  return (
    <Button
      {...{
        ...props,
        className: `${props.className || ''} ${styles.baseButton}`,
      }}
    >
      {props.children}
    </Button>
  );
}
