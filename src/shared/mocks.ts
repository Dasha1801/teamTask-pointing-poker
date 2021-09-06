import { TUserRole, User } from '../redux/types';
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
