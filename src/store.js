import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import immutableTransform from "redux-persist-transform-immutable";
import storage from "redux-persist/lib/storage";
import { AccountStateRecord } from "./reducers/AccountReducer";
import reducer from "./reducers/index";

export const persistConfig = {
  key: "projectable",
  transforms: [
    immutableTransform({
      records: [AccountStateRecord]
    })
  ],
  whitelist: ["account"],
  storage
};

export const persistedReducer = persistReducer(persistConfig, reducer);

export default function configureStore(initialState) {
  const store = createStore(
    persistedReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  const persistor = persistStore(store);

  return { store, persistor };
}
