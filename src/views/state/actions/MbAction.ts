import { Action } from "redux";
import { ApiDataStatus } from "../../../../types";

export interface MbAction<T = unknown> extends Action<string> {
  type: string;
  payload?: T;
  loadStatus?: ApiDataStatus;
}
