import { combineReducers } from "redux";
import { usersReducer } from "./users";
import { usersInitialState } from "./users";

// TODO: type rootReducer
export const rootReducer: any = combineReducers({
  users: usersReducer,
});

export const initialStoreState: StoreState = {
  users: usersInitialState,
};
