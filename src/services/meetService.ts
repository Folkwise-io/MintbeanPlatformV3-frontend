import { MeetDao } from "daos/MeetDao";
import { LoggerService } from "./loggerService";

export class MeetService {
  constructor(private eventDao: MeetDao, private logger: LoggerService) {}

  fetchMeets(): Promise<HackMeet[]> {
    return this.eventDao.fetchMeets();
  }
}
