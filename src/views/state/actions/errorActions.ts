import { ErrorActionType } from "./actionTypes";
import { v4 as uuidV4 } from "uuid";
import { MbAction } from "./MbAction";
import { LoggedError } from "../../../../types";

export const logError = (message: string, code: string): MbAction<LoggedError> => ({
  type: ErrorActionType.LOG_ERROR,
  payload: {
    id: uuidV4(),
    message,
    code,
    timestamp: new Date().toISOString(),
  },
});
