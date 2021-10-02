import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  gameSelectors,
  gameSettingsSelectors,
} from '../../../../redux/selectors';
import { gameSettingsActions } from '../../../../redux/slices/game-settings/game-settings-slice';
import { TCardScore } from '../../../../redux/types/card';
import breakImage from '../../../../shared/assets/icons/break.svg';
import editCard from '../../../../shared/assets/icons/edit-issue.svg';
import { BasePopup } from '../../../shared/base-popup/base-popup';
import styles from './card.module.scss';
import PopupChangeCard from './popupChangeCard/popupChangeCard';

interface IPlayCardProps {
  mode: string;
  cardValue: TCardScore;
  isSelected: boolean;
  handleClick(): void;
}

function PlayCard({
  cardValue,
  mode,
  isSelected,
  handleClick,
}: React.PropsWithChildren<IPlayCardProps>): JSX.Element {
  const dispatch = useDispatch();
  const { cardValues } = useSelector(gameSettingsSelectors.selectSettings);
  const [value, setValue] = useState(cardValue);
  const gameStatus = useSelector(gameSelectors.selectGame).status;
  const [showEdit, setShowEdit] = useState(false);

  const handleClose = () => {
    setShowEdit(false);
    setValue(cardValue);
  };

  const handleShowEdit = () => {
    setShowEdit(true);
  };

  const handleSubmit = () => {
    dispatch(
      gameSettingsActions.changeSettings({
        cardValues: cardValues.map(function (item) {
          return item === cardValue ? value : item;
        }),
      })
    );
    handleClose();
  };
  return (
    <>
      <section
        className={styles.playCard}
        data-rank={value}
        data-mode={mode}
        onClick={handleClick}
      >
        {typeof value === 'number' && (
          <img
            src={editCard}
            className={styles.iconEdit}
            onClick={handleShowEdit}
          ></img>
        )}

        {isSelected && gameStatus !== 'lobby' && (
          <div className={styles.chosenCardBackground} />
        )}
        <div className={styles.top}>
          {value === 'break' ? (
            <img src={breakImage} alt="Break" width="75%" />
          ) : value === 'unknown' ? (
            '?'
          ) : (
            value
          )}
        </div>
        <div className={styles.center}>
          {value === 'break' ? (
            <img src={breakImage} alt="Break" width="75%" />
          ) : value === 'unknown' ? (
            '?'
          ) : (
            value
          )}
        </div>
        <div className={styles.bottom}>
          {value === 'break' ? (
            <img src={breakImage} alt="Break" width="75%" />
          ) : value === 'unknown' ? (
            '?'
          ) : (
            value
          )}
        </div>
      </section>

      {showEdit && (
        <BasePopup
          buttonCancelProps={{ onClick: handleClose }}
          buttonOkProps={{ onClick: handleSubmit }}
          buttonCancelText="No"
          buttonOkText="Yes"
        >
          <PopupChangeCard setValue={setValue} cardValues={cardValues} />
        </BasePopup>
      )}
    </>
  );
}

export default PlayCard;
