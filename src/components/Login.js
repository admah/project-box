import React from "react";
import PropTypes from "prop-types";
import { Authenticator } from "aws-amplify-react";
import ForgotPassword from "./auth/ForgotPassword";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import ConfirmSignUp from "./auth/ConfirmSignUp";

const CustomAuthenticator = props => (
  <Authenticator hideDefault>
    <SignIn history={props.history} onAwsLogin={props.onAwsLogin} />
    <SignUp />
    <ConfirmSignUp />
    <ForgotPassword />
  </Authenticator>
);

const Login = ({ history, onAwsLogin, user }) => (
  <React.Fragment>
    <CustomAuthenticator history={history} onAwsLogin={onAwsLogin} />
  </React.Fragment>
);

Login.propTypes = {
  history: PropTypes.object.isRequired,
  onAwsLogin: PropTypes.func.isRequired,
  user: PropTypes.object
};

export default Login;
