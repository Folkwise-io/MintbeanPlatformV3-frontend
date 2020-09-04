import { combineReducers } from "redux";
import { usersReducer, usersInitialState } from "./users";
import { errorsReducer, errorsInitialState } from "./errors";
import { toasterReducer, toasterInitialState } from "./toaster";

// TODO: type rootReducer
export const rootReducer: any = combineReducers({
  users: usersReducer,
  errors: errorsReducer,
  toaster: toasterReducer,
});

export const initialStoreState: StoreState = {
  users: usersInitialState,
  errors: errorsInitialState,
  toaster: toasterInitialState,
};
