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
}

export class GameSettings {
  timer?: ITimer;
  cardBackImage?: string;
  canDealerPlay = true;
  autoAdmit = true;
  autoFlipCards = true;
  canScoreAfterFlip = false;
  cardType = TCardType.fib;

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
    };
  }
}
