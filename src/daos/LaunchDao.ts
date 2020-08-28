import { Launch } from "../types/Launch";
import { gqlApiService } from "./utils";

interface LaunchRaw {
  mission_name: string;
}
interface LaunchesPastRaw {
  launchesPast: LaunchRaw[];
}
interface LaunchesResponseRaw {
  data: LaunchesPastRaw;
}

// TODO move axios to request util

const getLaunches = (qty: number): Promise<Launch[]> => {
  const query = `
    query PastLaunches {
      launchesPast(limit: ${qty}) {
        mission_name
      }
    }
    `;
  return gqlApiService<LaunchesResponseRaw>("https://api.spacex.land/graphql", query).then((result) => {
    if (!(result.data && result.data.launchesPast)) {
      return [];
    }
    return result.data.launchesPast.map(
      ({ mission_name }: LaunchRaw): Launch => ({
        missionName: mission_name,
      }),
    );
  });
};

export { getLaunches };
