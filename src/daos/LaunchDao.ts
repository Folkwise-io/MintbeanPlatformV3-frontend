import axios from "axios";
import { Launch } from "../types/Launch";

interface LaunchRaw {
  mission_name: string;
}

// TODO move axios to request util

const getLaunches = (qty: number): Promise<Launch[]> => {
  return axios({
    url: "https://api.spacex.land/graphql",
    method: "post",
    data: {
      query: `
        query PastLaunches {
          launchesPast(limit: ${qty}) {
            mission_name
          }
        }
        `,
    },
  }).then((result) => {
    if (!(result.data.data && result.data.data.launchesPast)) {
      return [];
    }
    return result.data.data.launchesPast.map(
      ({ mission_name }: LaunchRaw): Launch => ({
        missionName: mission_name,
      }),
    );
  });
};

export { getLaunches };
