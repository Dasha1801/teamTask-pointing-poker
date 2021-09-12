import { IInfoMessage } from './info-message';

export interface IApp {
  isConnected: boolean;
  infoMessages: IInfoMessage[];
}
