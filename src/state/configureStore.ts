import { createStore, applyMiddleware, Action } from "redux";
import logger from "./middleware/logger";
import thunkMiddleware from "redux-thunk";
import { rootReducer } from "./reducers";
import { StoreState } from "./types";

const initialState: StoreState = {
  beans: {
    beans: [
      { id: 1, username: "clairefro", body: "this is bean 1", createdAt: new Date() },
      { id: 2, username: "clairefro", body: "this is bean 2", createdAt: new Date() },
    ],
  },
};

// TODO: properly type configureStore
export default function configureStore(): any {
  const middlewares = [logger, thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  // TODO: properly type createStore
  const store = createStore<StoreState, Action, unknown, unknown>(rootReducer, initialState, middlewareEnhancer);

  return store;
}
