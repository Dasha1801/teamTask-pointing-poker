import styles from './base-popup.module.scss';
import React from 'react';
import { BaseButton } from '../buttons/base-button/base-button';
import { ButtonBlue } from '../buttons/button-blue/button-blue';

interface IBasePopupProps {
  buttonOkProps?: React.ComponentProps<typeof ButtonBlue>;
  buttonCancelProps?: React.ComponentProps<typeof BaseButton>;
  buttonOkText?: string;
  buttonCancelText?: string;
  className?: string;
  heading?: string;
}

export function BasePopup({
  heading,
  buttonOkText,
  buttonCancelText,
  className,
  buttonOkProps,
  buttonCancelProps,
  children,
}: React.PropsWithChildren<IBasePopupProps>): JSX.Element {
  const popupStyle = className ? styles[String(className)] : '';
  const buttonOkClass = `${buttonOkProps?.className || ''} ${styles.buttonOk}`;
  const buttonCancelClass = `${buttonCancelProps?.className || ''} ${
    styles.buttonCancel
  }`;
  return (
    <>
      <div className={styles.overlay} />
      <div className={`${styles.popup} ${popupStyle}`}>
        {heading && <h2 className={styles.heading}>{heading}</h2>}
        <div className={styles.content}>{children}</div>
        <div className={styles.buttons}>
          {buttonOkText && (
            <BaseButton
              {...{
                ...buttonOkProps,
                className: buttonOkClass,
              }}
            >
              {buttonOkText}
            </BaseButton>
          )}
          {buttonCancelText && (
            <ButtonBlue
              {...{
                ...buttonCancelProps,
                className: buttonCancelClass,
              }}
            >
              {buttonCancelText}
            </ButtonBlue>
          )}
        </div>
      </div>
    </>
  );
}
