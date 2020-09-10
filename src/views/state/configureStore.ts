import { createStore, applyMiddleware, Action, Store } from "redux";
import logger from "./middleware/logger";
import thunkMiddleware from "redux-thunk";
import { rootReducer, initialStoreState } from "./reducers";
import { Context } from "context/contextBuilder";

import { composeWithDevTools } from "redux-devtools-extension";

export function configureStore(context: Context, hasLogger = true): Store<StoreState, Action<MbAction>> {
  const middlewares = [thunkMiddleware.withExtraArgument(context)].concat(hasLogger ? [logger] : []);
  const middlewareEnhancer = composeWithDevTools(applyMiddleware(...middlewares));

  // TODO: properly type createStore
  const store = createStore<StoreState, Action, unknown, unknown>(rootReducer, initialStoreState, middlewareEnhancer);

  return store;
}
