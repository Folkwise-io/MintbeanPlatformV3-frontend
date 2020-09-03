import { FETCH_USERS } from "./userActionsTypes";
import { ThunkAction } from "redux-thunk";
import { Context } from "context/contextBuilder";

export function fetchUsers(): ThunkAction<void, StoreState, Context, MbAction> {
  return async (dispatch: any, getState, context) => {
    dispatch({
      type: FETCH_USERS,
      loadStatus: "LOADING",
    });
    try {
      const users = await context.userService.fetchUsers();
      // type Result<T> = {
      //   payload: T;
      //   success: boolean;
      //   toast?: any[];
      //   burnt?: boolean
      // };
      // return dispatch(mapResult(result))
      return dispatch({
        type: FETCH_USERS,
        payload: users,
        loadStatus: "SUCCESS",
      });
    } catch (e) {
      //TODO: need to log this
      console.error(e);

      return dispatch({
        type: FETCH_USERS,
        loadStatus: "ERROR",
      });
    }
  };
}
