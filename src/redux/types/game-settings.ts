import { TCardType } from './card';
import { immerable } from 'immer';

export interface ITimer {
  minutes: number;
  seconds: number;
}

export interface IGameSettings {
  [immerable]: boolean;
  timer?: ITimer;
  cardBackImage?: string;
  canDealerPlay: boolean;
  autoAdmit: boolean;
  autoFlipCards: boolean;
  canScoreAfterFlip: boolean;
  cardType: TCardType;
}

export class GameSettings {
  [immerable] = true;
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
}
