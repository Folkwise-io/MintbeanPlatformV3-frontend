import { AuthActionType } from "./actionTypes";
import { ThunkAction } from "redux-thunk";
import { Context } from "context/contextBuilder";
import { Dispatch } from "redux";
import { MbAction } from "./MbAction";

const loginAction = (loadStatus: ApiDataStatus, payload?: User): MbAction<User> => ({
  type: AuthActionType.LOGIN,
  payload,
  loadStatus,
});

export function login(loginInput: LoginInput): ThunkAction<void, StoreState, Context, MbAction<void>> {
  return (dispatch: Dispatch, _getState, context) => {
    dispatch(loginAction("LOADING"));
    return context.authService
      .login(loginInput)
      .then((user: User | void) => {
        if (!user) {
          dispatch(loginAction("ERROR"));
          throw null;
        }
        context.loggerService.success("Successfully logged in.");
        return dispatch(loginAction("SUCCESS", user));
      })
      .catch(() => {
        return dispatch(loginAction("ERROR"));
      });
  };
}

const logoutAction = (loadStatus: ApiDataStatus) => ({
  type: AuthActionType.LOGOUT,
  payload: undefined,
  loadStatus,
});

export function logout(): ThunkAction<void, StoreState, Context, MbAction<void>> {
  return (dispatch: Dispatch, _getState, context) => {
    return context.authService
      .logout()
      .then((res: boolean | void) => {
        if (!res) {
          dispatch(logoutAction("ERROR"));
          throw null;
        }
        return dispatch(logoutAction("SUCCESS"));
      })
      .catch(() => {
        return dispatch(logoutAction("ERROR"));
      });
  };
}
