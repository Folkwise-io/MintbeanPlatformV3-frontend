import { combineReducers } from "redux";
import { usersReducer, usersInitialState } from "./users";
import { errorsReducer, errorsInitialState } from "./errors";
import { toastsReducer, toastsInitialState } from "./toasts";

// TODO: type rootReducer
export const rootReducer = combineReducers({
  users: usersReducer,
  errors: errorsReducer,
  toasts: toastsReducer,
});

export const initialStoreState: StoreState = {
  users: usersInitialState,
  errors: errorsInitialState,
  toasts: toastsInitialState,
};
