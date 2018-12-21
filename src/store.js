import { createStore } from "redux";
import AccountReducer from "./reducers";

const Store = createStore(
  AccountReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default Store;
