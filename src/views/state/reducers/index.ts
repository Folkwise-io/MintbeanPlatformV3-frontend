import { combineReducers } from "redux";
import { usersReducer } from "./users";

import { loaderReducer } from "./loader";

// TODO: type rootReducer
export const rootReducer: any = combineReducers({
  users: usersReducer,
  loader: loaderReducer,
});
