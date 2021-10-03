import React, { SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';
import { gameSettingsSelectors } from '../../../../../redux/selectors';
import { TCardScore } from '../../../../../redux/types';
import { deck as chosenDeck } from '../constants';
import styles from './popupAddCard.module.scss';

interface IPropsCard {
  setValues: React.Dispatch<React.SetStateAction<TCardScore[]>>;
  cardValues: TCardScore[];
}

const PopupAddCard = ({ setValues, cardValues }: IPropsCard): JSX.Element => {
  const { cardType } = useSelector(gameSettingsSelectors.selectSettings);
  const deck = chosenDeck[cardType];
  const newCardValues = deck.filter((item) => !cardValues.includes(item));

  const handleSetValues = (e: SyntheticEvent) => {
    const value = +(e.target as HTMLSelectElement).value;
    setValues([...cardValues, value]);
  };

  return (
    <div className={styles.container}>
      <h4 className={styles.titlePopup}>Add Card</h4>
      {cardType !== 'custom' ? (
        <form>
          <label htmlFor="addCard" className={styles.label}>
            <p>Select card values:</p>
            <select
              name="addCard"
              className={styles.cardSelect}
              onChange={handleSetValues}
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
          <label htmlFor="addCard" className={styles.label}>
            <p>Select card values:</p>
            <input
              type="number"
              name="addCard"
              className={styles.cardSelect}
              onChange={handleSetValues}
            ></input>
          </label>
        </form>
      )}
    </div>
  );
};

export default PopupAddCard;
