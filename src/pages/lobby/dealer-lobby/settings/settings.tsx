import React, { SyntheticEvent } from 'react';
import { Col, FormControl } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { gameSettingsSelectors } from '../../../../redux/selectors';
import { gameSettingsActions } from '../../../../redux/slices/game-settings/game-settings-slice';
import { TCardType } from '../../../../redux/types';
import { APP_CONSTANTS } from '../../../../shared/constants';
import Timer from '../../../shared/timer/timer';
import { deck } from '../../../shared/cards/constants';
import Deck from '../../../shared/cards/deck';
import styles from './settings.module.scss';

const GameSettings = (): JSX.Element => {
  const timer = useSelector(gameSettingsSelectors.selectSettings).timer;
  const dispatch = useDispatch();
  const { canDealerPlay } = useSelector(gameSettingsSelectors.selectSettings);
  const autoAdmit = useSelector(gameSettingsSelectors.selectSettings).autoAdmit;
  const { autoFlipCards } = useSelector(gameSettingsSelectors.selectSettings);
  const { canScoreAfterFlip } = useSelector(
    gameSettingsSelectors.selectSettings
  );
  const { cardType } = useSelector(gameSettingsSelectors.selectSettings);

  const handleCardType = (event: SyntheticEvent) => {
    const value = (event.target as HTMLSelectElement).value as TCardType;
    dispatch(
      gameSettingsActions.changeSettings({
        cardType: value,
        cardValues: deck[value].slice(0, APP_CONSTANTS.DECK_SIZE),
      })
    );
  };
  return (
    <div className={styles.settingsList}>
      <div className={styles.itemSettings}>
        <label htmlFor="can-dealer-play" className={styles.setting}>
          Scram master as player:
        </label>
        <Col lg={2} className={styles.right}>
          <div className={`${styles.container} form-check form-switch`}>
            <FormControl
              className={`${styles.switcher} form-check-input`}
              type="checkbox"
              id="can-dealer-play"
              onChange={() =>
                dispatch(
                  gameSettingsActions.changeSettings({
                    canDealerPlay: !canDealerPlay,
                  })
                )
              }
            />
          </div>
        </Col>
      </div>

      <div className={styles.itemSettings}>
        <label htmlFor="can-score-after-flip" className={styles.setting}>
          Changing card in round end:
        </label>
        <Col lg={2} className={styles.right}>
          <div className={`${styles.container} form-check form-switch`}>
            <FormControl
              id="can-score-after-flip"
              className={`${styles.switcher} form-check-input`}
              type="checkbox"
              onChange={() =>
                dispatch(
                  gameSettingsActions.changeSettings({
                    canScoreAfterFlip: !canScoreAfterFlip,
                  })
                )
              }
            />
          </div>
        </Col>
      </div>

      <div className={styles.itemSettings}>
        <label htmlFor="auto-admit" className={styles.setting}>
          Automatically admit all new members:
        </label>
        <Col lg={2} className={styles.right}>
          <div className={`${styles.container} form-check form-switch`}>
            <FormControl
              className={`${styles.switcher} form-check-input`}
              type="checkbox"
              id="auto-admit"
              onChange={() =>
                dispatch(
                  gameSettingsActions.changeSettings({ autoAdmit: !autoAdmit })
                )
              }
            />
          </div>
        </Col>
      </div>

      <div className={styles.itemSettings}>
        <label htmlFor="auto-flip" className={styles.setting}>
          Automatic flip of cards:
        </label>
        <Col lg={2} className={styles.right}>
          <div className={`${styles.container} form-check form-switch`}>
            <FormControl
              className={`${styles.switcher} form-check-input`}
              type="checkbox"
              id="auto-flip"
              onChange={() =>
                dispatch(
                  gameSettingsActions.changeSettings({
                    autoFlipCards: !autoFlipCards,
                  })
                )
              }
            />
          </div>
        </Col>
      </div>

      <div className={styles.itemSettings}>
        <label htmlFor="is-timer-set" className={styles.setting}>
          Set timer:
        </label>
        <Col lg={2} className={styles.right}>
          <div className={`${styles.container} form-check form-switch`}>
            <FormControl
              className={`${styles.switcher} form-check-input`}
              type="checkbox"
              id="is-timer-set"
              onChange={() => {
                if (timer) {
                  dispatch(
                    gameSettingsActions.changeSettings({
                      timer: undefined,
                    })
                  );
                } else {
                  dispatch(
                    gameSettingsActions.changeSettings({
                      timer: { minutes: 2, seconds: 30 },
                    })
                  );
                }
              }}
            />
          </div>
        </Col>
      </div>

      {timer && (
        <div className={styles.itemSettings}>
          <h5 className={styles.setting}>Round time:</h5>
          <Timer
            minutes={timer.minutes}
            seconds={timer.seconds}
            disabled={false}
          />
        </div>
      )}

      <div className={styles.itemSettings}>
        <label htmlFor="score" className={styles.setting}>
          Score type:
        </label>
        <select
          id="score"
          className={styles.select}
          value={cardType}
          onChange={handleCardType}
        >
          <option>{TCardType.custom}</option>
          <option>{TCardType.fib}</option>
          <option>{TCardType.powersOfTwo}</option>
        </select>
      </div>

      <div className={styles.settingsCard}>
        <h5 className={styles.setting}>Add card values:</h5>
        <div className={styles.playCards}>
          <Deck />
        </div>
      </div>
    </div>
  );
};

export default GameSettings;
