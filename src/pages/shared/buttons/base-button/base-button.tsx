import styles from './base-button.module.scss';
import React from 'react';
import Button from 'react-bootstrap/Button';

export function BaseButton({
  onClick,
  className,
  children,
}: React.ComponentProps<typeof Button>): JSX.Element {
  return (
    <Button
      className={`${className || ''} ${styles.baseButton}`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
