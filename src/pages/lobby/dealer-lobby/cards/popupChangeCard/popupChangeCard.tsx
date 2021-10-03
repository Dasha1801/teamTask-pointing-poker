import React from 'react';
import { useSelector } from 'react-redux';
import { gameSettingsSelectors } from '../../../../../redux/selectors';
import { TCardScore, TCardScoreSpecialValue } from '../../../../../redux/types';
import { deck as chosenDeck } from '../constants';
import styles from './popupChangeCard.module.scss';

interface IPropsCard {
  setValue: React.Dispatch<
    React.SetStateAction<number | TCardScoreSpecialValue>
  >;
  cardValues: TCardScore[];
}

const PopupChangeCard = ({ setValue, cardValues}: IPropsCard): JSX.Element => {
  const cardType = useSelector(gameSettingsSelectors.selectSettings).cardType;
  const deck = chosenDeck[cardType];
  const newCardValues = deck.filter((item) => !cardValues.includes(item));

  return (
    <div className={styles.container}>
      <h4 className={styles.titlePopup}>Update Card</h4>

      {cardType !== 'custom' ? (
        <form>
          <label htmlFor="updateCard" className={styles.label}>
            <p>Select card values:</p>
            <select
              name="updateCard"
              className={styles.cardSelect}
              onChange={(e) => setValue(+e.target.value)}
            >
              <option>choose</option>
              {newCardValues.map((item) => {
                return <option key={item}>{item}</option>;
              })}
            </select>
          </label>
        </form>
      ) : (
        <form>
          <label htmlFor="updateCard" className={styles.label}>
            <p>Select card values:</p>
            <input
              type="number"
              name="addCard"
              className={styles.cardSelect}
              onChange={(e) => setValue(+e.target.value)}
            ></input>
          </label>
        </form>
      )}
    </div>
  );
};

export default PopupChangeCard;
