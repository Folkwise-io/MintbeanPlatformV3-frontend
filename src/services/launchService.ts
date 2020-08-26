import LaunchDao from "../daos/LaunchDao";
import { Launch } from "../types/Launch";

export const getLaunches = (): Promise<Launch[]> => {
  return LaunchDao.getLaunches();
};
