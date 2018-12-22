import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "./store";

import Amplify from "aws-amplify";
import Wrapper from "./containers/Wrapper";
import awsmobile from "./aws-exports";

Amplify.configure(awsmobile);

const { store, persistor } = configureStore({});

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Route pattern="/" component={Wrapper} />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
