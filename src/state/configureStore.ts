import { createStore, applyMiddleware, Action } from "redux";
import logger from "./middleware/logger";
import thunkMiddleware from "redux-thunk";
import { rootReducer } from "./reducers";
import { StoreState } from "./types";

const initialState: StoreState = {
  users: [],
  loader: [],
};

// TODO: properly type configureStore
export default function configureStore(): any {
  const middlewares = [logger, thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  // TODO: properly type createStore
  const store = createStore<StoreState, Action, unknown, unknown>(rootReducer, initialState, middlewareEnhancer);

  return store;
}
