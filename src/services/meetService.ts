import { MeetDao } from "daos/MeetDao";

export class MeetService {
  constructor(private eventDao: MeetDao) {}

  fetchMeets(): Promise<HackMeet[]> {
    return this.eventDao.fetchMeets();
  }
}
