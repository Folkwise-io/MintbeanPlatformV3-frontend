import { Launch } from "../../types/Launch";
export const SET_LAUNCHES = "SET_LAUNCHES";

export type Quote = string;

interface SetLaunchesAction {
  type: typeof SET_LAUNCHES;
  launches: Promise<Launch[]>;
}

export interface LaunchesState {
  launches: Launch[];
}

export type LaunchActionsTypes = SetLaunchesAction;
