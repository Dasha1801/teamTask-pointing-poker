import React from 'react';
import { Col, FormControl } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { gameSettingsSelectors } from '../../../../redux/selectors';
import { gameSettingsActions } from '../../../../redux/slices/game-settings/game-settings-slice';
import { TCardType } from '../../../../redux/types';
import Timer from '../../../shared/timer/timer';
import styles from './settings.module.scss';

const GameSettings = (): JSX.Element => {
  const timer = useSelector(gameSettingsSelectors.selectSettings).timer;
  const dispatch = useDispatch();
  const canDealerPlay = useSelector(
    gameSettingsSelectors.selectSettings
  ).canDealerPlay;
  const autoAdmit = useSelector(gameSettingsSelectors.selectSettings).autoAdmit;
  const autoFlipCards = useSelector(
    gameSettingsSelectors.selectSettings
  ).autoFlipCards;
  const canScoreAfterFlip = useSelector(
    gameSettingsSelectors.selectSettings
  ).canScoreAfterFlip;
  const cardType = useSelector(gameSettingsSelectors.selectSettings).cardType;

  return (
    <div className={styles.settingsList}>
      <div className={styles.itemSettings}>
        <h5 className={styles.setting}>Scram master as player:</h5>
        <Col lg={2} className={styles.right}>
          <div className={`${styles.container} form-check form-switch`}>
            <FormControl
              className={`${styles.switcher} form-check-input`}
              type="checkbox"
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
        <h5 className={styles.setting}>Changing card in round end:</h5>
        <Col lg={2} className={styles.right}>
          <div className={`${styles.container} form-check form-switch`}>
            <FormControl
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
        <h5 className={styles.setting}>Automatically admit all new members:</h5>
        <Col lg={2} className={styles.right}>
          <div className={`${styles.container} form-check form-switch`}>
            <FormControl
              className={`${styles.switcher} form-check-input`}
              type="checkbox"
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
        <h5 className={styles.setting}>Automatic flip of cards:</h5>
        <Col lg={2} className={styles.right}>
          <div className={`${styles.container} form-check form-switch`}>
            <FormControl
              className={`${styles.switcher} form-check-input`}
              type="checkbox"
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
        <h5 className={styles.setting}>Set timer:</h5>
        <Col lg={2} className={styles.right}>
          <div className={`${styles.container} form-check form-switch`}>
            <FormControl
              className={`${styles.switcher} form-check-input`}
              type="checkbox"
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
        <h5 className={styles.setting}>Score type:</h5>
        <select
          className={styles.select}
          value={cardType}
          onChange={(event) =>
            dispatch(
              gameSettingsActions.changeSettings({
                cardType: event.target.value as TCardType,
              })
            )
          }
        >
          <option>{TCardType.custom}</option>
          <option>{TCardType.fib}</option>
          <option>{TCardType.powersOfTwo}</option>
        </select>
      </div>

      <div className={styles.itemSettings}>
        <h5 className={styles.setting}>Add card values:</h5>
      </div>
    </div>
  );
};

export default GameSettings;
