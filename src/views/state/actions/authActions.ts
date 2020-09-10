import { ErrorActionType, AuthActionType } from "./actionTypes";
import { ThunkAction } from "redux-thunk";
import { Context } from "context/contextBuilder";
import { addSuccessToast, addErrorToast } from "./toastActions";
import { Dispatch } from "redux";

const action = (loadStatus: ApiDataStatus, payload?: User): MbAction<User> => ({
  type: AuthActionType.LOGIN,
  payload,
  loadStatus,
});

export function login(credentials: LoginInput): ThunkAction<void, StoreState, Context, MbAction<void>> {
  return (dispatch: Dispatch, _getState, context) => {
    const sendLoginErrorToast = () => dispatch(addErrorToast("Sorry, something went wrong with your login."));

    dispatch(action("LOADING"));
    return context.authService
      .login(credentials)
      .then((user: User | undefined) => {
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
        console.log("entered error");
        return dispatch(action("ERROR"));
      });
  };
}
