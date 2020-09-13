import { MeetDao } from "daos/MeetDao";
import { LoggerService } from "./loggerService";

export class MeetService {
  constructor(private eventDao: MeetDao, private logger: LoggerService) {}

  fetchMeets(): Promise<HackMeet[] | void> {
    return this.eventDao.fetchMeets().catch((e) => this.logger.handleGraphqlErrors(e));
  }
}
