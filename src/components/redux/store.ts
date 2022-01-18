import { createStore, combineReducers, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import logger from "redux-logger";

import themeModeReducer from "./reducers/darkMode";
import TerminalsReducer from "./reducers/terminalsReducer";

const rootReducer = combineReducers({
  themeMode: themeModeReducer,
  terminal: TerminalsReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
const store: Store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
