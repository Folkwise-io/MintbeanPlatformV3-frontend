import { MeetDao } from "../daos/MeetDao";
import { LoggerService } from "./loggerService";

export class MeetService {
  constructor(private meetDao: MeetDao, private logger: LoggerService) {}

  /* TODO: Move all logging/error handling for actions into Service layer */
  async fetchMeets(): Promise<Meet[]> {
    return this.meetDao.fetchMeets().catch((e) => {
      this.logger.handleGraphqlErrors(e);
      return [];
    });
  }
  async createMeet(params: CreateMeetParams): Promise<Meet | undefined> {
    return this.meetDao.createMeet(params).catch((e) => {
      this.logger.handleGraphqlErrors(e);
      return undefined;
    });
  }
}
