import { ErrorAction } from "../actions/actionTypes";

export const errorsInitialState: ErrorsState = [];

export function errorsReducer(state = errorsInitialState, action: MbAction): ErrorsState {
  switch (action.type) {
    case ErrorAction.LOG_ERROR:
      return [...state, { error: action.payload.error, timestamp: action.payload.timestamp }];
    default:
      return state;
  }
}
