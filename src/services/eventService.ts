import { EventDao } from "daos/EventDao";

export class EventService {
  constructor(private eventDao: EventDao) {}

  fetchEvents(): Promise<HackEvent[]> {
    return this.eventDao.fetchEvents();
  }
}
