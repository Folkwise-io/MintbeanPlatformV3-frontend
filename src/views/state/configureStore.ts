import { createStore, applyMiddleware, Action, Store } from "redux";
import logger from "./middleware/logger";
import thunkMiddleware from "redux-thunk";
import { rootReducer } from "./reducers";
import { Context } from "context/contextBuilder";

const initialState: StoreState = {
  users: [],
  loader: [],
};

// TODO: properly type configureStore
export function configureStore(context: Context): Store<StoreState, Action<any>> {
  const middlewares = [logger, thunkMiddleware.withExtraArgument(context)];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  // TODO: properly type createStore
  const store = createStore<StoreState, Action, unknown, unknown>(rootReducer, initialState, middlewareEnhancer);

  return store;
}
