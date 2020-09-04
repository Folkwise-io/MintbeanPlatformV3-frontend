import { ErrorActionType } from "../actions/actionTypes";

export const errorsInitialState: LoggedError[] = [];

export function errorsReducer(state = errorsInitialState, action: MbAction<LoggedError>): LoggedError[] {
  switch (action.type) {
    case ErrorActionType.LOG_ERROR:
      return [
        ...state,
        {
          error: (action.payload && action.payload.error) || new Error("errorsReducer received action without error"),
          timestamp: (action.payload && action.payload.timestamp) || new Date().toISOString(),
        },
      ];
    default:
      return state;
  }
}
