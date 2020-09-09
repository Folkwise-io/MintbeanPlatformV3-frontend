import { MeetDao } from "daos/MeetDao";

export class MeetService {
  constructor(private eventDao: MeetDao) {}

  fetchMeets(): Promise<HackEvent[]> {
    return this.eventDao.fetchMeets();
  }
}
