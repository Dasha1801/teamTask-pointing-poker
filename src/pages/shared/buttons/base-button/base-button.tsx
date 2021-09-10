import styles from './base-button.module.scss';
import React from 'react';
import Button from 'react-bootstrap/Button';

export function BaseButton(
  props: React.ComponentProps<typeof Button>
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
