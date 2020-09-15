import { combineReducers } from "redux";
import { usersReducer, usersInitialState } from "./users";
import { userReducer, userInitialState } from "./user";
import { errorsReducer, errorsInitialState } from "./errors";
import { toastsReducer, toastsInitialState } from "./toasts";

// TODO: type rootReducer
export const rootReducer = combineReducers({
  users: usersReducer,
  user: userReducer,
  errors: errorsReducer,
  toasts: toastsReducer,
});

export const initialStoreState: StoreState = {
  users: usersInitialState,
  user: userInitialState,
  errors: errorsInitialState,
  toasts: toastsInitialState,
};
