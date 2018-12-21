import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./store";
import Amplify from "aws-amplify";
import Wrapper from "./containers/Wrapper";
import awsmobile from "./aws-exports";

Amplify.configure(awsmobile);

ReactDOM.render(
  <Provider store={Store}>
    <BrowserRouter>
      <Route pattern="/" component={Wrapper} />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
