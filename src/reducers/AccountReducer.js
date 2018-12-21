import { Record } from "immutable";
import * as Constants from "../constants";

export const AccountStateRecord = Record({
  name: "",
  email: "",
  id: ""
});

const defaultState = AccountStateRecord();

export default function(state = defaultState, action) {
  switch (action.type) {
    case Constants.ACCOUNT_AWS_LOGIN_SUCCESS:
      return state
        .set("name", action.payload.username)
        .set("email", action.payload.email)
        .set("id", action.payload.id);

    case Constants.ACCOUNT_AWS_LOGOUT_SUCCESS:
      return AccountStateRecord();

    default:
      return state;
  }
}
