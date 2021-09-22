import React from 'react';
import loading from '../../../shared/assets/icons/loading.svg';
import s from './spinner.module.scss';

const LoadSpinner = (): JSX.Element => {
  return (
    <>
      <img src={loading} alt="Loading..." className={s.loading} />
    </>
  );
};

export default LoadSpinner;
