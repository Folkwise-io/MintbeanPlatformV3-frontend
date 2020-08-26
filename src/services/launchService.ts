import { getLaunches as getLaunchesDao } from "../daos/LaunchDao";
import { Launch } from "../types/Launch";

export const getLaunches = (qty: number): Promise<Launch[]> => {
  return getLaunchesDao(qty);
};
