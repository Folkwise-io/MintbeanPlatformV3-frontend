import { AuthActionType } from "../actions/actionTypes";
import { Reducer } from "redux";

export const userInitialState: UserState = { data: undefined, loadStatus: "SUCCESS" };

export const userReducer: Reducer<UserState, MbAction<User>> = (
  state = userInitialState,
  action: MbAction<User>,
): UserState => {
  if (action.loadStatus === "ERROR" || action.loadStatus === "LOADING") {
    return { data: state.data, loadStatus: action.loadStatus };
  }

  switch (action.type) {
    case AuthActionType.LOGIN: {
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
