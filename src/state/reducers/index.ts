import { combineReducers } from "redux";
import { postsReducer } from "./post";
import { usersReducer } from "./users";

import { loaderReducer } from "./loader";

// TODO: type rootReducer
export const rootReducer: any = combineReducers({
  posts: postsReducer,
  users: usersReducer,
  loader: loaderReducer,
});
