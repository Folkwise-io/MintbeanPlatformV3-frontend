import { FETCH_USERS } from "../actions/userActionsTypes";
import { UsersState } from "../types";
import { MbAction } from "../types";

const initialState: UsersState = [];

export function usersReducer(state = initialState, action: MbAction): UsersState {
  switch (action.type) {
    case FETCH_USERS:
      return action.payload;
    default:
      return state;
  }
}
