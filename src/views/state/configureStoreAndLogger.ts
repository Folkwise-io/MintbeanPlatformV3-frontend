import { createStore, applyMiddleware, Action, Store } from "redux";
import thunkMiddleware from "redux-thunk";
import { rootReducer, initialStoreState } from "./reducers";

import { composeWithDevTools } from "redux-devtools-extension";
import { Context } from "../../context/contextBuilder";
import { MbAction } from "./actions/MbAction";

export function configureStoreAndLogger(context: Context): Store<StoreState, MbAction> {
  const middlewares = [thunkMiddleware.withExtraArgument(context)];
  const middlewareEnhancer = composeWithDevTools(applyMiddleware(...middlewares));

  // TODO: properly type createStore
  const store = createStore<StoreState, Action, unknown, unknown>(rootReducer, initialStoreState, middlewareEnhancer);

  // Maybe this is a nitpick. But this is fucking ugly. Can we find a better pattern?
  context.loggerService.setStore(store);

  return store;
}
