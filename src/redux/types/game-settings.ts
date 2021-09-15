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
  showTimer: boolean;
}

export class GameSettings {
  timer?: ITimer;
  cardBackImage?: string;
  canDealerPlay = false;
  autoAdmit = false;
  autoFlipCards = false;
  canScoreAfterFlip = false;
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
      cardType: this.cardType,
      showTimer: this.showTimer,
    };
  }
}
