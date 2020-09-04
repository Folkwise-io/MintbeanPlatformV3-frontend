import { ErrorAction, ToastAction, UserAction } from "./actionTypes";
import { ThunkAction } from "redux-thunk";
import { Context } from "context/contextBuilder";
import { addErrorToast } from "./toastActions";

const action = (loadStatus: ApiDataStates, payload?: User[]) => ({
  type: UserAction.FETCH_USERS,
  payload,
  loadStatus,
});

export function fetchUsers(): ThunkAction<void, StoreState, Context, MbAction> {
  return (dispatch: any, _getState, context) => {
    dispatch(action("LOADING"));
    return context.userService
      .fetchUsers()
      .then((users) => dispatch(action("SUCCESS", users)))
      .catch((err) => {
        dispatch(addErrorToast("Oh no! We couldn't fetch users."));
        console.error("ERROR!!", err);
        dispatch({
          type: ErrorAction.LOG_ERROR,
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
