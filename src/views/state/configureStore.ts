import { createStore, applyMiddleware, Action, Store } from "redux";
import logger from "./middleware/logger";
import thunkMiddleware from "redux-thunk";
import { rootReducer, initialStoreState } from "./reducers";

import { composeWithDevTools } from "redux-devtools-extension";
import { Context } from "../../context/contextBuilder";

// TODO: properly type configureStore
export function configureStore(context: Context): Store<StoreState, Action<MbAction>> {
  const middlewares = [thunkMiddleware.withExtraArgument(context), logger];
  const middlewareEnhancer = composeWithDevTools(applyMiddleware(...middlewares));

  // TODO: properly type createStore
  const store = createStore<StoreState, Action, unknown, unknown>(rootReducer, initialStoreState, middlewareEnhancer);

  return store;
}
