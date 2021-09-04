export enum TUserRole {
  dealr = 'dealer',
  player = 'player',
  observer = 'observer',
}

export interface IUser {
  id: string;
  firstName: string;
  lastName?: string;
  jobPosition?: string;
  image: string;
  role: TUserRole;
}
