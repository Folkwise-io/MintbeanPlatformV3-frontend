import { ErrorAction, ToastAction, UserAction } from "./actionTypes";
import { ThunkAction } from "redux-thunk";
import { Context } from "context/contextBuilder";

export function fetchUsers(): ThunkAction<void, StoreState, Context, MbAction> {
  return async (dispatch: any, _getState, context) => {
    dispatch({
      type: UserAction.FETCH_USERS,
      loadStatus: "LOADING",
    });
    try {
      const users = await context.userService.fetchUsers();

      return dispatch({
        type: UserAction.FETCH_USERS,
        payload: users,
        loadStatus: "SUCCESS",
      });
    } catch (err) {
      // Example of optionally adding toast to the queue
      dispatch({
        type: ToastAction.ADD_TOAST,
        payload: {
          type: "ERROR",
          message: "Oh no! We couldn't fetch users.",
        },
      });
      // Add to errors log
      // (This may be moved to an API call instead of storing in store)
      console.error(err);
      dispatch({
        type: ErrorAction.LOG_ERROR,
        payload: {
          error: err,
          timestamp: new Date().toISOString(),
        },
      });

      // Update FETCH_USERS loadStatus on error
      return dispatch({
        type: UserAction.FETCH_USERS,
        loadStatus: "ERROR",
      });
    }
  };
}
