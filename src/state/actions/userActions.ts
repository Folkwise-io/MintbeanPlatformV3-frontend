import { FETCH_USERS } from "./userActionsTypes";
import { fetchUsers as fetchUsersService } from "../../services/userService";
import { ThunkAction } from "redux-thunk";
import { StoreState } from "../types";
import { MbAction } from "../types";

export function fetchUsers(): ThunkAction<void, StoreState, unknown, MbAction> {
  const nonSuccessPayload: any = [];
  return async (dispatch: any) => {
    dispatch({
      type: FETCH_USERS,
      payload: nonSuccessPayload,
      api: true,
      status: "LOADING",
    });
    try {
      const users = await fetchUsersService();

      return dispatch({
        type: FETCH_USERS,
        payload: users,
        api: true,
        status: "SUCCESS",
      });
    } catch (err) {
      alert(err);
      return dispatch({
        type: FETCH_USERS,
        payload: nonSuccessPayload,
        api: true,
        status: "ERROR",
      });
    }
  };
}
