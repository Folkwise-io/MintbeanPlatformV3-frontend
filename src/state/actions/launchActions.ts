import { SET_LAUNCHES, LaunchActionsTypes } from "./launchActionsTypes";
import { getLaunches } from "../../services/launchService";
import { ThunkAction } from "redux-thunk";
import { StoreState } from "../types";

export function setLaunches(qty: number): ThunkAction<void, StoreState, unknown, LaunchActionsTypes> {
  return async (dispatch: any) => {
    try {
      const launches = await getLaunches(qty);
      return dispatch({
        type: SET_LAUNCHES,
        launches,
      });
    } catch (err) {
      return alert(err);
    }
  };
}

// return async (dispatch: any) => {
//   try {
//     const data = await promise;
//     dispatch({
//       type: SET_LAUNCHES,
//       data: data,
//     });
//   } catch (err) {
//     dispatch({
//       type: SET_LAUNCHES,
//       data: null,
//     });
//   }
//   dispatch({
//     type: FETCHING_DATA,
//     fetching: false,
//   });
// };
