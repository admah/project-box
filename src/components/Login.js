import React from "react";
import { Authenticator } from "aws-amplify-react";
import ForgotPassword from "./auth/ForgotPassword";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import ConfirmSignUp from "./auth/ConfirmSignUp";

const CustomAuthenticator = props => (
  <Authenticator hideDefault>
    <SignIn history={props.history} />
    <SignUp />
    <ConfirmSignUp />
    <ForgotPassword />
  </Authenticator>
);

const Login = ({ history, user }) => (
  <React.Fragment>
    {!user && <CustomAuthenticator history={history} />}
  </React.Fragment>
);

export default Login;
