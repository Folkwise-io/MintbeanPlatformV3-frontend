import { FETCH_USERS } from "../actions/userActionsTypes";

const initialState: UsersState = { data: [], loadStatus: "SUCCESS" };

export function usersReducer(state = initialState, action: MbAction): UsersState {
  if (action.loadStatus === "ERROR" || action.loadStatus === "LOADING") {
    return { data: state.data, loadStatus: action.loadStatus };
  }

  switch (action.type) {
    case FETCH_USERS:
      return { data: action.payload, loadStatus: "SUCCESS" };
    default:
      return state;
  }
}
