import { combineReducers } from "redux";
import { postsReducer } from "./post";

// TODO: type rootReducer
export const rootReducer: any = combineReducers({ posts: postsReducer });
