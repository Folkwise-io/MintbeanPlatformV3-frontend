import { ApiQueryExecutor } from "api/ApiQueryExecutor";
import { MeetDao } from "./MeetDao";

interface EventResponseRaw {
  events: HackMeet[];
}

export class MeetDaoImpl implements MeetDao {
  constructor(private api: ApiQueryExecutor) {}

  fetchMeets(): Promise<HackMeet[]> {
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
              groupSize
              difficulty
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
