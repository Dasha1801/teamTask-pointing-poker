export enum TStatusCode {
  OK = 200,
  INTERNAL_SERVER_ERROR = 500,
  NOT_FOUND = 404,
  BAD_REQUEST = 400,
  ACCEPTED = 202,
}

const OPACITY_REDUCTION_VALUE = 0.1;
const INFO_MESSAGE_TIMEOUT = 5 * 1000;
const INFO_MESSAGE_INTERVAL = 550;
const URL_REGEXP =
  '^(http://www.|https://www.|http://|https://)[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$';

export const APP_CONSTANTS = {
  URL_REGEXP,
  INFO_MESSAGE_TIMEOUT,
  INFO_MESSAGE_INTERVAL,
  OPACITY_REDUCTION_VALUE,
};
