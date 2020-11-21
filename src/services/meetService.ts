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
  async fetchMeet(id: string): Promise<Meet | void> {
    return this.meetDao.fetchMeet(id).catch((e) => {
      this.logger.handleGraphqlErrors(e);
    });
  }
  async deleteMeet(id: string): Promise<boolean | void> {
    try {
      const success = await this.meetDao.deleteMeet(id);
      this.logger.success("Successfully deleted the meet.");
      return success;
    } catch (e) {
      this.logger.handleGraphqlErrors(e);
    }
  }
  async createMeet(params: CreateMeetInput): Promise<Meet | void> {
    try {
      const meet = await this.meetDao.createMeet(params);
      this.logger.success(`Created new meet **${meet.title}**!`);
      return meet;
    } catch (e) {
      this.logger.handleGraphqlErrors(e);
    }
  }
  async editMeet(id: string, params: EditMeetInput): Promise<Meet | void> {
    try {
      const meet = await this.meetDao.editMeet(id, params);
      this.logger.success(`Updated info for meet **${meet.title}**!`);
      return meet;
    } catch (e) {
      this.logger.handleGraphqlErrors(e);
    }
  }
  async registerForMeet(meetId: string): Promise<boolean | void> {
    try {
      const success = await this.meetDao.registerForMeet(meetId);
      this.logger.success(`You're signed up! Check your email for details on how to join.`);
      return success;
    } catch (e) {
      this.logger.handleGraphqlErrors(e);
    }
  }
}
