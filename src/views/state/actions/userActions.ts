import { FETCH_USERS } from "./userActionsTypes";
import { ThunkAction } from "redux-thunk";
import { Context } from "context/contextBuilder";

export function fetchUsers(): ThunkAction<void, StoreState, Context, MbAction> {
  return async (dispatch: any, getState, context) => {
    dispatch({
      type: FETCH_USERS,
      api: true,
      status: "LOADING",
    });
    try {
      const users = await context.userService.fetchUsers();

      return dispatch({
        type: FETCH_USERS,
        payload: users,
        api: true,
        status: "SUCCESS",
      });
    } catch (e) {
      //TODO: need to log this
      console.error(e);

      return dispatch({
        type: FETCH_USERS,
        payload: e.message,
        api: true,
        status: "ERROR",
      });
    }
  };
}
