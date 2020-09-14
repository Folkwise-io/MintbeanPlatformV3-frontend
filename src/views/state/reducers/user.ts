import { AuthActionType } from "../actions/actionTypes";
import { Reducer } from "redux";
import { MbAction } from "../actions/MbAction";

export const userInitialState: UserState = { data: undefined, loadStatus: "SUCCESS" };

export const userReducer: Reducer<UserState, MbAction<User>> = (
  state = userInitialState,
  action: MbAction<User>,
): UserState => {
  switch (action.type) {
    case AuthActionType.LOGIN: {
      if (action.loadStatus === "ERROR" || action.loadStatus === "LOADING") {
        return { data: state.data, loadStatus: action.loadStatus };
      }
      if (!action.payload) {
        console.error("Action expected payload data but received none.");
        return state;
      }
      return { data: action.payload, loadStatus: action.payload === null ? "ERROR" : "SUCCESS" };
    }
    default:
      return state;
  }
};
