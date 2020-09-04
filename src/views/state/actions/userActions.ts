import { ErrorActionType, UserActionType } from "./actionTypes";
import { ThunkAction } from "redux-thunk";
import { Context } from "context/contextBuilder";
import { addErrorToast, addInfoToast, addSuccessToast, addWarningToast } from "./toastActions";
import { Dispatch } from "redux";

const action = (loadStatus: ApiDataStatus, payload?: User[]): MbAction<User[]> => ({
  type: UserActionType.FETCH_USERS,
  payload,
  loadStatus,
});

export function fetchUsers(): ThunkAction<void, StoreState, Context, MbAction<void>> {
  return (dispatch: Dispatch, _getState, context) => {
    dispatch(action("LOADING"));
    dispatch(addInfoToast("Loading users."));
    dispatch(addWarningToast("WARNING! This call could fail. HINT: what if you disabled the server?"));
    return context.userService
      .fetchUsers()
      .then((users) => {
        dispatch(addSuccessToast("Successfully loaded users."));
        return dispatch(action("SUCCESS", users));
      })
      .catch((err: Error) => {
        dispatch(addErrorToast("Oh no! We couldn't fetch users."));
        console.error("ERROR!!", err);
        dispatch({
          type: ErrorActionType.LOG_ERROR,
          payload: {
            error: err,
            timestamp: new Date().toISOString(),
          },
        });

        // Update FETCH_USERS loadStatus on error
        return dispatch(action("ERROR"));
      });
  };
}
