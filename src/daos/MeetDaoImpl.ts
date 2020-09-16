import { ApiQueryExecutor } from "../api/ApiQueryExecutor";
import { MeetDao } from "./MeetDao";

interface EventResponseRaw {
  meets: HackMeet[];
}
// not tested
export class MeetDaoImpl implements MeetDao {
  constructor(private api: ApiQueryExecutor) {}

  fetchMeets(): Promise<HackMeet[]> {
    return (
      this.api
        .query<ApiResponseRaw<EventResponseRaw>>(
          `
          query allEvents {
            events {
              name
              image
              description
              startDate
              endDate
              region
              sponsors {
                name
                blurb
                image
              }
            }
          }
        `,
        )
        .then((result) => {
          if (result.errors) throw result.errors;
          if (!result.errors && !result.data.meets) {
            throw [{ message: "Failed to get meets", extensions: { code: "UNEXPECTED" } }];
          }
          return result.data.meets;
        })
        // TODO: What potential Types of errors can invoke this catch?
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        .catch((e: any) => {
          if (e.errors) {
            throw e.errors;
          } else {
            throw [{ message: e.message, extensions: { code: "UNEXPECTED" } }];
          }
        })
      /* eslint-enable  @typescript-eslint/no-explicit-any */
    );
  }
}
