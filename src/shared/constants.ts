export enum TStatusCode {
  OK = 200,
  INTERNAL_SERVER_ERROR = 500,
  NOT_FOUND = 404,
  BAD_REQUEST = 400,
  ACCEPTED = 202,
}

const URL_REGEXP =
  '^(http://www.|https://www.|http://|https://)[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$';

export const APP_CONSTANTS = {
  URL_REGEXP,
};
