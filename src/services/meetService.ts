import { MeetDao } from "../daos/MeetDao";
import { LoggerService } from "./loggerService";

export class MeetService {
  constructor(private meetDao: MeetDao, private logger: LoggerService) {}

  /* This action does not update the redux store, so error handling happens here in service rather than an action */
  async fetchMeets(): Promise<HackMeet[] | void> {
    let meets: Promise<HackMeet[]>;
    try {
      meets = this.meetDao.fetchMeets();
    } catch (e) {
      this.logger.handleGraphqlErrors(e);
    }
    return meets;
  }
}
