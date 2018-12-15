import React from "react";
import { Authenticator } from "aws-amplify-react";
import ForgotPassword from "./auth/ForgotPassword";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";

const CustomAuthenticator = props => (
  <Authenticator hideDefault>
    <SignIn history={props.history} />
    <SignUp />
    <ForgotPassword />
  </Authenticator>
);

const Login = ({ history, user }) => (
  <React.Fragment>
    {!user && <CustomAuthenticator history={history} />}
  </React.Fragment>
);

export default Login;
