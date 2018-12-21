import React from "react";
import PropTypes from "prop-types";
import { Auth } from "aws-amplify";
import { Button } from "semantic-ui-react";

const SignOut = ({ history, onAwsLogout }) => (
  <Button
    onClick={() => {
      Auth.signOut();
      onAwsLogout();
      history.push("/");
    }}
  >
    Sign Out
  </Button>
);

SignOut.propTypes = {
  history: PropTypes.object.isRequired,
  onAwsLogout: PropTypes.func.isRequired
};

export default SignOut;
