import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter } from "react-router-dom";
import Amplify from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";
import Wrapper from "./containers/Wrapper";
import awsmobile from "./aws-exports";

Amplify.configure(awsmobile);

const WrapperWithAuth = withAuthenticator(Wrapper);

ReactDOM.render(
  <BrowserRouter>
    <Route pattern="/" component={WrapperWithAuth} />
  </BrowserRouter>,
  document.getElementById("root")
);
