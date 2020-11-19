import { UserActionType } from "../actions/actionTypes";
import { Reducer } from "redux";
import { MbAction } from "../actions/MbAction";
import { UsersState, User } from "../../../../types";

export const usersInitialState: UsersState = { data: [], loadStatus: "SUCCESS" };

export const usersReducer: Reducer<UsersState, MbAction<User[]>> = (
  state = usersInitialState,
  action: MbAction<User[]>,
): UsersState => {
  switch (action.type) {
    case UserActionType.FETCH_USERS: {
      if (action.loadStatus === "ERROR" || action.loadStatus === "LOADING") {
        return { data: state.data, loadStatus: action.loadStatus };
      }
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
