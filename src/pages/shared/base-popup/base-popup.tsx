import styles from './base-popup.module.scss';
import React from 'react';
import { BaseButton as BaseButton } from '../buttons/base-button/base-button';
import { ButtonBlue } from '../buttons/button-blue/button-blue';

interface IBasePopupProps {
  buttonOkProps?: React.ComponentProps<typeof BaseButton>;
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
      <div className={styles.popupContainer}>
        <div className={`${styles.popup} ${popupStyle}`}>
          {heading && <h2 className={styles.heading}>{heading}</h2>}
          <div className={styles.content}>{children}</div>
          <div className={styles.buttons}>
            {buttonOkText && (
              <ButtonBlue
                {...{
                  ...buttonOkProps,
                  className: buttonOkClass,
                }}
              >
                {buttonOkText}
              </ButtonBlue>
            )}
            {buttonCancelText && (
              <BaseButton
                {...{
                  ...buttonCancelProps,
                  className: buttonCancelClass,
                }}
              >
                {buttonCancelText}
              </BaseButton>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
