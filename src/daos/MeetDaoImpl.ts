import { ApiQueryExecutor } from "api/ApiQueryExecutor";
import { MeetDao } from "./MeetDao";

interface EventResponseRaw {
  events: HackEvent[];
}

export class MeetDaoImpl implements MeetDao {
  constructor(private api: ApiQueryExecutor) {}

  fetchMeets(): Promise<HackEvent[]> {
    return this.api
      .query<EventResponseRaw>(
        `
          query allEvents {
            events {
              name
              image
              description
              startDate
              endDate
              sponsors {
                name
                blurb
                image
              }
            }
          }   
        `,
      )
      .then((result) => result.events || []);
  }
}
