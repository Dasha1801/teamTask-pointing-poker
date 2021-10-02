import { TCardScore } from '.';
import { deck } from '../../pages/lobby/dealer-lobby/cards/constants';

import { TCardType } from './card';

export interface ITimer {
  minutes: number;
  seconds: number;
}

export interface IGameSettings {
  timer?: ITimer;
  cardBackImage?: string;
  canDealerPlay: boolean;
  autoAdmit: boolean;
  autoFlipCards: boolean;
  canScoreAfterFlip: boolean;
  cardType: TCardType;
  cardValues: TCardScore[];
  showTimer: boolean;
}

export class GameSettings {
  timer?: ITimer;
  cardBackImage?: string;
  canDealerPlay = false;
  autoAdmit = false;
  autoFlipCards = false;
  canScoreAfterFlip = false;
  cardValues = deck.fib.slice(0, 5);
  cardType = TCardType.fib;
  showTimer = false;

  constructor(settings?: Partial<IGameSettings>) {
    Object.assign(this, settings);
  }

  toObject(): IGameSettings {
    return {
      timer: this.timer,
      cardBackImage: this.cardBackImage,
      canDealerPlay: this.canDealerPlay,
      autoAdmit: this.autoAdmit,
      autoFlipCards: this.autoFlipCards,
      canScoreAfterFlip: this.canScoreAfterFlip,
      cardValues: this.cardValues,
      cardType: this.cardType,
      showTimer: this.showTimer,
    };
  }
}
