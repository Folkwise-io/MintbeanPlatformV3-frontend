import { SET_LAUNCHES /*, LaunchActionsTypes*/ } from "./launchActionsTypes";
import { getLaunches } from "../../services/launchService";
import { ThunkAction } from "redux-thunk";
import { StoreState } from "../types";
import { MbAction } from "../types";

export function setLaunches(qty: number): ThunkAction<void, StoreState, unknown, MbAction> {
  const nonSuccessPayload: any = [];
  return async (dispatch: any) => {
    dispatch({
      type: SET_LAUNCHES,
      payload: nonSuccessPayload,
      api: true,
      status: "LOADING",
    });
    try {
      const launches = await getLaunches(qty);
      return dispatch({
        type: SET_LAUNCHES,
        payload: launches,
        api: true,
        status: "SUCCESS",
      });
    } catch (err) {
      alert(err);
      return dispatch({
        type: SET_LAUNCHES,
        payload: nonSuccessPayload,
        api: true,
        status: "ERROR",
      });
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
