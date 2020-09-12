import { Action } from "redux";

export interface MbAction<T = unknown> extends Action<string> {
  type: string;
  payload?: T;
  loadStatus?: ApiDataStatus;
}
