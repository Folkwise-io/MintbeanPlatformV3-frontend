import { MeetDao } from "../daos/MeetDao";

export class MeetService {
  constructor(private meetDao: MeetDao) {}

  async fetchMeets(): Promise<HackMeet[]> {
    return this.meetDao.fetchMeets();
  }
}
