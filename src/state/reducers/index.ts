import { combineReducers } from "redux";
import { postsReducer } from "./post";
import { launchesReducer } from "./launch";

// TODO: type rootReducer
export const rootReducer: any = combineReducers({ posts: postsReducer, launches: launchesReducer });
