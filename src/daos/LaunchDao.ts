import axios from "axios";
import { Launch } from "../types/Launch";

interface LaunchRaw {
  mission_name: string;
}

const getLaunches = (): Promise<Launch[]> => {
  return new Promise((resolve, reject) => {
    axios({
      url: "https://api.spacex.land/graphql",
      method: "post",
      data: {
        query: `
        query PastLaunches {
          launchesPast(limit: 10) {
            mission_name
          }
        }
        `,
      },
    })
      .then((result) => {
        console.log(result.data.data);

        let standardized: Launch[];
        if (result.data.data && result.data.data.launchesPast) {
          standardized = result.data.data.launchesPast.map(
            (l: LaunchRaw): Launch => ({
              missionName: l.mission_name,
            }),
          );
        } else {
          standardized = [];
        }
        console.log({ standardized });
        resolve(standardized);
      })
      .catch((err) => reject(err));
  });
};

// Export *****************************************
const LaunchDao: any = {
  getLaunches,
};

export default LaunchDao;
