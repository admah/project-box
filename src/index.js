import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import Wrapper from "./containers/Wrapper";

ReactDOM.render(
  <BrowserRouter>
    <Route pattern="/" component={Wrapper} />
  </BrowserRouter>,
  document.getElementById("root")
);
