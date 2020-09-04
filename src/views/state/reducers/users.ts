import { UserActionType } from "../actions/actionTypes";

export const usersInitialState: UsersState = { data: [], loadStatus: "SUCCESS" };

export function usersReducer(state = usersInitialState, action: MbAction): UsersState {
  if (action.loadStatus === "ERROR" || action.loadStatus === "LOADING") {
    return { data: state.data, loadStatus: action.loadStatus };
  }

  switch (action.type) {
    case UserActionType.FETCH_USERS:
      return { data: action.payload, loadStatus: "SUCCESS" };
    default:
      return state;
  }
}
