import React from "react";
import { Auth } from "aws-amplify";
import { Button } from "semantic-ui-react";

const SignOut = ({ history }) => (
  <Button
    inverted
    onClick={history => {
      Auth.signOut();
      history.push("/");
    }}
  >
    Sign Out
  </Button>
);
export default SignOut;
