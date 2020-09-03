import { combineReducers } from "redux";
import { usersReducer } from "./users";

// TODO: type rootReducer
export const rootReducer: any = combineReducers({
  users: usersReducer,
});
