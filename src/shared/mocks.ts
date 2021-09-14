import { Issue, Message, TUserRole, User } from '../redux/types';
import { TStatusCode } from './constants';

export const mockConnectResponseSuccess = {
  connectionStatus: true,
  statusCode: TStatusCode.OK,
};

export const mockCreateGameResponseSuccess = {
  gameId: 'mockGameId',
  dealerId: 'mockDealerId',
  statusCode: TStatusCode.OK,
};

export const mockAddPlayerResponseSuccess = {
  gameId: 'mockGameId',
  issues: [],
  players: [],
  messages: [],
  dealer: new User({
    id: 'mockDealerId',
    role: TUserRole.dealer,
    firstName: 'mockDealerFirstName',
  }),
  playerId: 'mockPlayerId',
  statusCode: TStatusCode.OK,
};

export const mockCheckGameResponseSuccess = {
  gameExists: true,
  statusCode: TStatusCode.OK,
};

export const mockPostMessageResponseSuccess = {
  gameId: 'mockGameId',
  messageId: 'mockPlayerId',
  statusCode: TStatusCode.OK,
};

export const leaveGameResponseSuccess = {
  gameId: 'mockGameId',
  statusCode: TStatusCode.OK,
};

export const startRoundResponseSuccess = {
  gameId: 'mockGameId',
  issueId: 'mockIssueId',
  statusCode: TStatusCode.OK,
};

export const kickPlayerResponseSuccess = {
  gameId: 'mockGameId',
  kickedPlayerId: 'mockIssueId',
  statusCode: TStatusCode.OK,
};

export const createIssueResponseSuccess = {
  gameId: 'mockGameId',
  issueId: 'mockIssueId',
  statusCode: TStatusCode.OK,
};

export const updateIssueResponseSuccess = {
  gameId: 'mockGameId',
  issueId: 'mockIssueId',
  statusCode: TStatusCode.OK,
};

export const deleteIssueResponseSuccess = {
  gameId: 'mockGameId',
  deletedIssueId: 'mockIssueId',
  statusCode: TStatusCode.OK,
};

export const startGameResponseSuccess = {
  gameId: 'mockGameId',
  statusCode: TStatusCode.OK,
};

export const cancelGameResponseSuccess = {
  gameId: 'mockGameId',
  statusCode: TStatusCode.OK,
};

export const postMessageResponseSuccess = {
  gameId: 'mockGameId',
  statusCode: TStatusCode.OK,
};

export const scoreIssueResponseSuccess = {
  gameId: 'mockGameId',
  issueId: 'mockIssueId',
  statusCode: TStatusCode.OK,
};

export const finishGameResponseSuccess = {
  gameId: 'mockGameId',
  statusCode: TStatusCode.OK,
};

export const changeCurrentIssueResponseSuccess = {
  gameId: 'mockGameId',
  issueId: 'mockIssueId',
  statusCode: TStatusCode.OK,
};

export const issues = [
  new Issue({ title: 'Planning 23' }).toObject(),
  new Issue({ title: '123456' }).toObject(),
  new Issue({ title: '222285' }).toObject(),
];

export const users = [
  new User({
    role: TUserRole.observer,
    firstName: 'John',
    jobPosition: 'IOS Developer',
    lastName: 'Tramp',
    image:
      'https://www.liga.net/images/general/2019/02/14/20190214174619-9721.png',
    id: '1',
  }).toObject(),
  new User({
    role: TUserRole.dealer,
    firstName: 'Simon',
    lastName: 'Pit',
    jobPosition: 'IOS Developer',
    id: '2',
  }).toObject(),
  new User({
    role: TUserRole.player,
    firstName: 'Ann',
    image:
      'https://likeyou.io/wp-content/uploads/2019/02/Snimok-ekrana-2019-02-15-v-16.03.56.png',
    jobPosition: 'FrontEnd Developer',
    id: '3',
  }).toObject(),
  new User({
    role: TUserRole.player,
    firstName: 'John',
    jobPosition: 'IOS Developer',
    id: '4',
    lastName: 'Tramp',
    image:
      'https://likeyou.io/wp-content/uploads/2019/02/Snimok-ekrana-2019-02-15-v-15.44.03.png',
  }).toObject(),
  new User({
    role: TUserRole.player,
    firstName: 'Simon',
    lastName: 'Pit',
    id: '5',
  }).toObject(),
  new User({
    role: TUserRole.player,
    firstName: 'Ann',
    image:
      'https://likeyou.io/wp-content/uploads/2019/02/Snimok-ekrana-2019-02-15-v-16.03.56.png',
    jobPosition: 'FrontEnd Developer',
    id: '6',
  }).toObject(),
  new User({ role: TUserRole.player, firstName: 'Simon' }).toObject(),
  new User({
    role: TUserRole.observer,
    firstName: 'Jack',
    image:
      'https://cdn.maximonline.ru/ec/5b/70/ec5b701b6dc90d27cbde89b6e19a0d07/728x728_1_848ca9ef388ee0fdc2c538677e5709a7@1024x1024_0xac120002_17992516771550233711.jpg',
    jobPosition: 'FrontEnd Developer',
    id: '7',
  }).toObject(),
];

export const currentUser = new User({
  role: TUserRole.player,
    firstName: 'Ann',
    image:
      'https://likeyou.io/wp-content/uploads/2019/02/Snimok-ekrana-2019-02-15-v-16.03.56.png',
    jobPosition: 'FrontEnd Developer',
    id: '3',
}).toObject();

export const dealer = new User({
  role: TUserRole.dealer,
  firstName: 'Simon',
  lastName: 'Pit',
  id: '2',
}).toObject();

export const issue = new Issue({ title: 'Planning 23' }).toObject();

export const messages = [
  new Message({ id: '1', userId: '1', message: 'Hello everyone!' }).toObject(),
  new Message({ id: '2', userId: '2', message: 'Hi!' }).toObject(),
  new Message({
    id: '3',
    userId: '3',
    message: 'Note that the development build is not optimized.',
  }).toObject(),
  new Message({
    id: '4',
    userId: '4',
    message: 'To create a production build, use npm run build.',
  }).toObject(),
  new Message({
    id: '6',
    userId: '6',
    message: 'To create a production build, use npm run build.',
  }).toObject(),
];
