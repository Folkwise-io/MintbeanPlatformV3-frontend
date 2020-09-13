import { ApiQueryExecutor } from "api/ApiQueryExecutor";
import { MeetDao } from "./MeetDao";
import { LoggerService } from "services/loggerService";

interface EventResponseRaw {
  meets: HackMeet[];
}
// not tested
export class MeetDaoImpl implements MeetDao {
  // must keep loggerService for initialization
  constructor(private api: ApiQueryExecutor, private loggerService: LoggerService) {}

  fetchMeets(): Promise<HackMeet[] | void> {
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
        // TODO: Don't know what type[s] of errors could be thrown here.
        // For now builds standard errors based on error message or default
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        .catch((e: any) => {
          throw e;
        })
    );
    /* eslint-enable  @typescript-eslint/no-explicit-any */
  }
}
