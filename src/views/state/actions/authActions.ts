import { AuthActionType } from "./actionTypes";
import { ThunkAction } from "redux-thunk";
import { Dispatch } from "redux";
import { MbAction } from "./MbAction";
import { Context } from "../../../context/contextBuilder";
import { hasErrorWithCode } from "../../../utils/hasErrorWithCode";

const loginAction = (loadStatus: ApiDataStatus, payload?: User): MbAction<User> => ({
  type: AuthActionType.LOGIN,
  payload,
  loadStatus,
});

export function login(params: LoginParams): ThunkAction<void, StoreState, Context, MbAction<void>> {
  return (dispatch: Dispatch, _getState, context) => {
    dispatch(loginAction("LOADING"));
    return context.authService
      .login(params)
      .then((user: User) => {
        if (!user) {
          dispatch(loginAction("ERROR"));
          throw null;
        }
        context.loggerService.success(
          `<p>Welcome back, ${user.firstName}!</p><p>Check out our <u><strong><a href="/meets">Upcoming Meets</a></strong></u> to get hacking!</p>`,
        );
        return dispatch(loginAction("SUCCESS", user));
      })
      .catch(() => {
        // For security reasons, throw ambiguous error toast with login errors
        context.loggerService.handleGraphqlErrors([{ message: "Login failed." }]);
        return dispatch(loginAction("ERROR"));
      });
  };
}

const logoutAction = (payload: boolean, loadStatus: ApiDataStatus) => ({
  type: AuthActionType.LOGOUT,
  payload, // true if successful logout
  loadStatus,
});

export function logout(): ThunkAction<void, StoreState, Context, MbAction<void>> {
  return (dispatch: Dispatch, _getState, context) => {
    return context.authService
      .logout()
      .then((res: boolean) => {
        if (!res) {
          dispatch(logoutAction(false, "ERROR"));
          throw null;
        }
        return dispatch(logoutAction(true, "SUCCESS"));
      })
      .catch(() => {
        context.loggerService.handleGraphqlErrors([{ message: "Logout failed." }]);
        return dispatch(logoutAction(false, "ERROR"));
      });
  };
}

const meAction = (loadStatus: ApiDataStatus, payload?: User | undefined) => ({
  type: AuthActionType.ME,
  payload,
  loadStatus,
});

export function me(): ThunkAction<void, StoreState, Context, MbAction<void>> {
  return (dispatch: Dispatch, _getState, context) => {
    dispatch(meAction("LOADING"));
    return (
      context.authService
        .me()
        .then((user: User) => {
          if (!user) {
            return dispatch(meAction("SUCCESS"));
          }
          return dispatch(meAction("SUCCESS", user));
        })
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        .catch((e: any) => {
          // we expect an UNAUTHENTICATED error from Apollo Server if user is not logged in
          if (hasErrorWithCode(e, "UNAUTHENTICATED")) {
            return dispatch(meAction("SUCCESS"));
          }
          context.loggerService.handleGraphqlErrors(
            e.errors ? e.errors : [{ message: "Unknown error when fetching current user." }],
            true, // silent
          );
        })
    );
    /* eslint-enable  @typescript-eslint/no-explicit-any */
  };
}

const registerAction = (loadStatus: ApiDataStatus, payload?: User): MbAction<User> => ({
  type: AuthActionType.REGISTER,
  payload,
  loadStatus,
});

export function register(params: RegisterParams): ThunkAction<void, StoreState, Context, MbAction<void>> {
  return (dispatch: Dispatch, getState, context) => {
    const userAlreadyLoggedin = getState().user.data;
    if (userAlreadyLoggedin) {
      return context.loggerService.danger("Sorry, you can't create an account because you're already logged in!");
    }
    dispatch(registerAction("LOADING"));
    return context.authService
      .register(params)
      .then((user: User) => {
        if (!user) {
          dispatch(registerAction("ERROR"));
          throw null;
        }
        context.loggerService.success(
          `Welcome to Mintbean, ${user.firstName}!<p>Check out our <u><strong><a href="/meets">Upcoming Meets</a></strong></u> to get hacking!</p>`,
        );
        return dispatch(registerAction("SUCCESS", user));
      })
      .catch((e) => {
        context.loggerService.handleGraphqlErrors(e);
        return dispatch(registerAction("ERROR"));
      });
  };
}
