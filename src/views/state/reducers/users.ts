import { FETCH_USERS } from "../actions/userActionsTypes";

const initialState: UsersState = { data: [], loadStatus: "SUCCESS" };

export function usersReducer(state = initialState, action: MbAction): UsersState {
  if (action.status === "ERROR" || action.status === "LOADING") {
    return { data: state.data, loadStatus: action.status };
  }

  switch (action.type) {
    case FETCH_USERS:
      return { data: action.payload, loadStatus: "SUCCESS" };
    default:
      return state;
  }
}
