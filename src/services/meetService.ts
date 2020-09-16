import { MeetDao } from "../daos/MeetDao";

export class MeetService {
  constructor(private meetDao: MeetDao) {}

  /* TODO: Move all logging/error handling for actions into Service layer */
  async fetchMeets(): Promise<HackMeet[]> {
    return this.meetDao.fetchMeets();
  }
}
