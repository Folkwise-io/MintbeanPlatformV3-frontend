import { SET_LAUNCHES, LaunchActionsTypes } from "./launchActionsTypes";
import LaunchDao from "../../daos/LaunchDao";
import { Launch } from "../../types/Launch";

type DispatchLaunchActionsTypes = (dispatch: any) => (dispatch: any) => LaunchActionsTypes;

export function setLaunches(): DispatchLaunchActionsTypes {
  // return {
  // type: SET_LAUNCHES,
  // launches: await promise,
  // };

  return (dispatch: any) => {
    return LaunchDao.getLaunches().then((launches: Launch[]) => {
      return dispatch({
        type: SET_LAUNCHES,
        launches,
      });
    });
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
