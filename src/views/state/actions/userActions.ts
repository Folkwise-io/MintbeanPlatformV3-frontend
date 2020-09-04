import { ErrorActionType, UserActionType } from "./actionTypes";
import { ThunkAction } from "redux-thunk";
import { Context } from "context/contextBuilder";
import { addErrorToast } from "./toastActions";
import { Dispatch } from "redux";

const action = (loadStatus: ApiDataStatus, payload?: User[]) => ({
  type: UserActionType.FETCH_USERS,
  payload,
  loadStatus,
});

export function fetchUsers(): ThunkAction<void, StoreState, Context, MbAction<void>> {
  return (dispatch: Dispatch, _getState, context) => {
    dispatch(action("LOADING"));
    return context.userService
      .fetchUsers()
      .then((users) => dispatch(action("SUCCESS", users)))
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
