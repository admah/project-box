import React from "react";
import { Authenticator } from "aws-amplify-react";
import SignIn from "./auth/SignIn";

const CustomAuthenticator = props => (
  <Authenticator hideDefault>
    <SignIn history={props.history} />
  </Authenticator>
);

const Login = ({ history, user }) => (
  <React.Fragment>
    {!user && <CustomAuthenticator history={history} />}
  </React.Fragment>
);

export default Login;
