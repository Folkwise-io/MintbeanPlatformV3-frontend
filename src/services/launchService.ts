import LaunchDao from "../daos/LaunchDao";
import { Launch } from "../types/Launch";

export const getLaunches = (qty: number): Promise<Launch[]> => {
  return LaunchDao.getLaunches(qty);
};
