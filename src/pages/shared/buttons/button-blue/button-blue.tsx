import styles from './button-blue.module.scss';
import React from 'react';
import { BaseButton } from '../base-button/base-button';

export function ButtonBlue({
  onClick,
  className,
  children,
}: React.ComponentProps<typeof BaseButton>): JSX.Element {
  return (
    <BaseButton
      className={`${className || ''} ${styles.buttonBlue}`}
      onClick={onClick}
    >
      {children}
    </BaseButton>
  );
}
