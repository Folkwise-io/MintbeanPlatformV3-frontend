import { UserActionType } from "../actions/actionTypes";
import { Reducer } from "redux";
import { MbAction } from "../actions/MbAction";

export const usersInitialState: UsersState = { data: [], loadStatus: "SUCCESS" };

export const usersReducer: Reducer<UsersState, MbAction<User[]>> = (
  state = usersInitialState,
  action: MbAction<User[]>,
): UsersState => {
  if (action.loadStatus === "ERROR" || action.loadStatus === "LOADING") {
    return { data: state.data, loadStatus: action.loadStatus };
  }

  switch (action.type) {
    case UserActionType.FETCH_USERS: {
      if (!action.payload) {
        console.error("Action expected payload data but received none.");
        return state;
      }
      return { data: action.payload, loadStatus: "SUCCESS" };
    }
    default:
      return state;
  }
};
