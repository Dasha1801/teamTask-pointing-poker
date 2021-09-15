import React from 'react';
import loading from '../../../shared/assets/icons/loading.svg';
import s from '../components/cards/cards.module.scss';

const Spinner = (): JSX.Element => {
  return (
    <>
      <img src={loading} alt="Loading..." className={s.loading} />
    </>
  );
};

export default Spinner;
