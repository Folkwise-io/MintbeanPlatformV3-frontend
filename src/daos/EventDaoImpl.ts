import { ApiQueryExecutor } from "api/ApiQueryExecutor";
import { EventDao } from "./EventDao";

interface EventResponseRaw {
  events: HackEvent[];
}

export class EventDaoImpl implements EventDao {
  constructor(private api: ApiQueryExecutor) {}

  fetchEvents(): Promise<HackEvent[]> {
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
