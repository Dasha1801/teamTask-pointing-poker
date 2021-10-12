export enum TInfoMessageType {
  error = 'error',
  info = 'info',
}

export interface IInfoMessage {
  id: number;
  text: string;
  type: TInfoMessageType;
}

export class InfoMessage implements IInfoMessage {
  static nextId = 1;
  id: number;

  constructor(public text: string, public type = TInfoMessageType.info) {
    this.id = InfoMessage.nextId;
    InfoMessage.nextId += 1;
  }

  toObject(): IInfoMessage {
    return {
      id: this.id,
      text: this.text,
      type: this.type,
    };
  }
}
