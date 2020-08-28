import { SET_LAUNCHES } from "../actions/launchActionsTypes";
import { LaunchesState } from "../types";
import { MbAction } from "../types";

const initialState: LaunchesState = [];

export function launchesReducer(state = initialState, action: MbAction): LaunchesState {
  switch (action.type) {
    case SET_LAUNCHES:
      return action.payload;
    default:
      return state;
  }
}
