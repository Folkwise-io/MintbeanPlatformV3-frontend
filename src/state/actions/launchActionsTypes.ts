import { Launch } from "../../types/Launch";
export const SET_LAUNCHES = "SET_LAUNCHES";

interface SetLaunchesAction {
  type: typeof SET_LAUNCHES;
  payload: Promise<Launch[]> | null;
}

export type LaunchActionsTypes = SetLaunchesAction;
