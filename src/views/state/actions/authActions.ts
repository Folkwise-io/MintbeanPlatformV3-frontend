import { ErrorActionType, AuthActionType } from "./actionTypes";
import { ThunkAction } from "redux-thunk";
import { Context } from "context/contextBuilder";
import { addSuccessToast, addErrorToast } from "./toastActions";
import { Dispatch } from "redux";
import { MbAction } from "./MbAction";

const action = (loadStatus: ApiDataStatus, payload?: User): MbAction<User> => ({
  type: AuthActionType.LOGIN,
  payload,
  loadStatus,
});

export function login(loginInput: LoginInput): ThunkAction<void, StoreState, Context, MbAction<void>> {
  return (dispatch: Dispatch, _getState, context) => {
    const sendLoginErrorToast = () => dispatch(addErrorToast("Sorry, something went wrong with your login."));

    dispatch(action("LOADING"));
    return context.authService
      .login(loginInput)
      .then((user: User | undefined | void) => {
        if (!user) {
          sendLoginErrorToast();
          return dispatch(action("ERROR"));
        }
        dispatch(addSuccessToast("Successfully logged in."));
        return dispatch(action("SUCCESS", user));
      })
      .catch((err: Error) => {
        sendLoginErrorToast();
        console.error("ERROR!!", err);
        dispatch({
          type: ErrorActionType.LOG_ERROR,
          payload: {
            error: err,
            timestamp: new Date().toISOString(),
          },
        });
        return dispatch(action("ERROR"));
      });
  };
}
