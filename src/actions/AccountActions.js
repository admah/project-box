import * as Constants from "../constants";

export function onAwsLogin(payload) {
  return {
    type: Constants.ACCOUNT_AWS_LOGIN_SUCCESS,
    payload
  };
}

export function onAwsLogout() {
  return {
    type: Constants.ACCOUNT_AWS_LOGOUT_SUCCESS
  };
}
