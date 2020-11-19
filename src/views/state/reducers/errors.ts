import { LoggedError } from "../../../../types";
import { ErrorActionType } from "../actions/actionTypes";
import { MbAction } from "../actions/MbAction";

export const errorsInitialState: LoggedError[] = [];

export function errorsReducer(
  state = errorsInitialState,
  action: MbAction<LoggedError> & { payload: LoggedError }, // guarantee payload
): LoggedError[] {
  switch (action.type) {
    case ErrorActionType.LOG_ERROR:
      return [...state, action.payload];
    default:
      return state;
  }
}
