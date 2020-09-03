import { createStore, applyMiddleware, Action } from "redux";
import logger from "./middleware/logger";
import thunkMiddleware from "redux-thunk";
import { rootReducer } from "./reducers";
import { StoreState } from "./types";
import { Context } from "context/contextBuilder";

const initialState: StoreState = {
  users: [],
  loader: [],
};

// TODO: properly type configureStore
export function configureStore(context: Context): any {
  const middlewares = [logger, thunkMiddleware.withExtraArgument(context)];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  // TODO: properly type createStore
  const store = createStore<StoreState, Action, unknown, unknown>(rootReducer, initialState, middlewareEnhancer);

  return store;
}
