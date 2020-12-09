import { MeetDao } from "../daos/MeetDao";
import { LoggerService } from "./loggerService";
import { EntityService } from "./entityService";
import { Meet, CreateMeetInput, EditMeetInput } from "../types/meet";

export class MeetService extends EntityService {
  constructor(private meetDao: MeetDao, logger: LoggerService) {
    super(logger);
  }

  /* TODO: Move all logging/error handling for actions into Service layer */
  async fetchMeets(): Promise<Meet[] | void> {
    return this.handleService(() => this.meetDao.fetchMeets());
  }

  async fetchMeet(id: string): Promise<Meet | void> {
    return this.handleService(() => this.meetDao.fetchMeet(id));
  }
  async deleteMeet(id: string): Promise<boolean | void> {
    return this.handleService(async () => {
      const success = await this.meetDao.deleteMeet(id);
      this.logger.success("Successfully deleted the meet.");
      return success;
    });
  }
  async createMeet(params: CreateMeetInput): Promise<Meet | void> {
    return this.handleService(async () => {
      const meet = await this.meetDao.createMeet(params);
      this.logger.success(`Created new meet **${meet.title}**!`);
      return meet;
    });
  }
  async editMeet(id: string, params: EditMeetInput): Promise<Meet | void> {
    return this.handleService(async () => {
      const meet = await this.meetDao.editMeet(id, params);
      this.logger.success(`Updated info for meet **${meet.title}**!`);
      return meet;
    });
  }
  async registerForMeet(meetId: string): Promise<boolean | void> {
    return this.handleService(async () => {
      const success = await this.meetDao.registerForMeet(meetId);
      this.logger.success(`You're signed up! Check your email for details on how to join.`);
      return success;
    });
  }
}
