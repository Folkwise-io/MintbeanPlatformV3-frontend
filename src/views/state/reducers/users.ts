import { FETCH_USERS } from "../actions/userActionsTypes";

const initialState: UsersState = [];

export function usersReducer(state = initialState, action: MbAction): UsersState {
  if (action.status === "ERROR" || action.status === "LOADING") {
    return state;
  }

  switch (action.type) {
    case FETCH_USERS:
      return action.payload;
    default:
      return state;
  }
}
