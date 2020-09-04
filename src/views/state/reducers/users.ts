import { UserActionType } from "../actions/actionTypes";
import { Reducer } from "redux";

export const usersInitialState: UsersState = { data: [], loadStatus: "SUCCESS" };

export const usersReducer: Reducer<UsersState, MbAction<UsersState>> = (
  state = usersInitialState,
  action: MbAction<UsersState>,
): UsersState => {
  if (action.loadStatus === "ERROR" || action.loadStatus === "LOADING") {
    return { data: state.data, loadStatus: action.loadStatus };
  }

  switch (action.type) {
    case UserActionType.FETCH_USERS: {
      if (!action?.payload?.data) {
        console.error("Action expected payload data but received none.");
        return state;
      }
      return { data: action.payload.data, loadStatus: "SUCCESS" };
    }
    default:
      return state;
  }
};
