import { AuthActionType } from "./actionTypes";
import { ThunkAction } from "redux-thunk";
import { Context } from "context/contextBuilder";
import { Dispatch } from "redux";
import { MbAction } from "./MbAction";

const action = (loadStatus: ApiDataStatus, payload?: User): MbAction<User> => ({
  type: AuthActionType.LOGIN,
  payload,
  loadStatus,
});

export function login(loginInput: LoginInput): ThunkAction<void, StoreState, Context, MbAction<void>> {
  return (dispatch: Dispatch, _getState, context) => {
    dispatch(action("LOADING"));
    return context.authService
      .login(loginInput)
      .then((user: User | void) => {
        if (!user) {
          dispatch(action("ERROR"));
          throw null;
        }
        context.loggerService.success("Successfully logged in.");
        return dispatch(action("SUCCESS", user));
      })
      .catch(() => {
        return dispatch(action("ERROR"));
      });
  };
}
