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
    return this.meetDao
      .deleteMeet(id)
      .then(() => this.logger.success("Successfully deleted the meet."))
      .catch((e) => {
        this.logger.handleGraphqlErrors(e);
      });
  }
  async createMeet(params: CreateMeetInput): Promise<Meet | void> {
    return this.meetDao
      .createMeet(params)
      .then((meet) => {
        this.logger.success(`Created new meet **${meet.title}**!`);
        return meet;
      })
      .catch((e) => {
        this.logger.handleGraphqlErrors(e);
      });
  }
  async editMeet(id: string, params: EditMeetInput): Promise<Meet | void> {
    return this.meetDao
      .editMeet(id, params)
      .then((meet) => {
        this.logger.success(`Updated info for meet **${meet.title}**!`);
        return meet;
      })
      .catch((e) => {
        this.logger.handleGraphqlErrors(e);
      });
  }
  async registerForMeet(meetId: string): Promise<boolean | void> {
    return this.meetDao
      .registerForMeet(meetId)
      .then(() => {
        this.logger.success(`You're signed up! Check your email for details on how to join.`);
      })
      .catch((e) => {
        this.logger.handleGraphqlErrors(e);
      });
  }
}
