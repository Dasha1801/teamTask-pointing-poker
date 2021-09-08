import styles from './base-popup.module.scss';
import React, { Component } from 'react';
import { BaseButton as BaseButton } from '../buttons/base-button/base-button';
import { ButtonBlue } from '../buttons/button-blue/button-blue';

interface IBasePopupProps {
  buttonOkProps?: React.ComponentProps<typeof BaseButton>;
  buttonCancelProps?: React.ComponentProps<typeof BaseButton>;
  contentProps?: React.ComponentProps<typeof Component>;
  buttonOkText?: string;
  buttonCancelText?: string;
  className?: string;
  headingText?: string;
}

export function BasePopup(
  props: React.PropsWithChildren<IBasePopupProps>
): JSX.Element {
  const {
    headingText,
    buttonOkText,
    buttonCancelText,
    className,
    buttonOkProps,
    buttonCancelProps,
    contentProps,
    children,
  } = props;
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
          {headingText && <h2 className={styles.headingText}>{headingText}</h2>}
          <div {...contentProps} className={styles.content}>
            {children}
          </div>
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
