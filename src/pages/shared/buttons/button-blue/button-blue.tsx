import styles from './button-blue.module.scss';
import React from 'react';
import { BaseButton } from '../base-button/base-button';

export function ButtonBlue(
  props: React.ComponentProps<typeof BaseButton>
): JSX.Element {
  return (
    <BaseButton
      {...{
        ...props,
        className: `${props.className} || '' ${styles.buttonBlue}`,
      }}
    >
      {props.children}
    </BaseButton>
  );
}
