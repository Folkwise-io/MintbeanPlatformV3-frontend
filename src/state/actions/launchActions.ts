import { SET_LAUNCH, LaunchActionsTypes } from "./launchActionsTypes";
import { Launch } from "../../types/Launch";

export async function setLaunch(): Promise<LaunchActionsTypes> {
  const promise: Promise<Launch[]> = fetch("http://api.icndb.com/jokes/random").then((response) => response.json());
  return {
    type: SET_LAUNCH,
    launches: promise,
  };
}
