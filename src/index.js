import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter } from "react-router-dom";
import Amplify from "aws-amplify";
import Wrapper from "./containers/Wrapper";
import awsmobile from "./aws-exports";

Amplify.configure(awsmobile);

ReactDOM.render(
  <BrowserRouter>
    <Route pattern="/" component={Wrapper} />
  </BrowserRouter>,
  document.getElementById("root")
);
