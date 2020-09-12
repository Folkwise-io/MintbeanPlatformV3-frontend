import { ApiQueryExecutor } from "api/ApiQueryExecutor";
import { MeetDao } from "./MeetDao";
import { LoggerService } from "services/loggerService";

interface EventResponseRaw {
  meets: HackMeet[];
}
// not tested
export class MeetDaoImpl implements MeetDao {
  constructor(private api: ApiQueryExecutor, private loggerService: LoggerService) {}

  fetchMeets(): Promise<HackMeet[]> {
    return this.api
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
      .then((result) => result.data.meets || []);
  }
}
