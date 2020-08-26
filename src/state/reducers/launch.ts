import { LaunchActionsTypes, SET_LAUNCHES } from "../actions/launchActionsTypes";
import { LaunchesState } from "../types";

const initialState: LaunchesState = [];

export function launchesReducer(state = initialState, action: LaunchActionsTypes): LaunchesState {
  switch (action.type) {
    case SET_LAUNCHES:
      return action.launches;

    default:
      return state;
  }
}
