import React from 'react';
import s from './cards.module.scss';
import choosen from '../../../../shared/assets/icons/chosen.svg';

function ChoosenCard(): JSX.Element {
  return (
    <section className={s.choosenCard}>
      <div className={s.center}>
        <img src={choosen} alt="" width="50%" style={{ opacity: '80%' }} />
      </div>
    </section>
  );
}

export default ChoosenCard;
