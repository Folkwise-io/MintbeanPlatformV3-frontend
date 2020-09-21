import { ProjectDao } from "../daos/ProjectDao";
import { LoggerService } from "./loggerService";

export class ProjectService {
  constructor(private projectDao: ProjectDao, private logger: LoggerService) {}

  async fetchProject(id: string): Promise<Project | void> {
    return this.projectDao.fetchProject(id).catch((e) => {
      this.logger.handleGraphqlErrors(e);
    });
  }
  // async fetchMeets(): Promise<Meet[]> {
  //   return this.projectDao.fetchMeets().catch((e) => {
  //     this.logger.handleGraphqlErrors(e);
  //     return [];
  //   });
  // }
  // async deleteMeet(id: string): Promise<boolean | void> {
  //   return this.projectDao
  //     .deleteMeet(id)
  //     .then(() => this.logger.success("Successfully deleted the meet."))
  //     .catch((e) => {
  //       this.logger.handleGraphqlErrors(e);
  //     });
  // }
  // async createMeet(params: CreateMeetParams): Promise<Meet | void> {
  //   return this.projectDao
  //     .createMeet(params)
  //     .then((meet) => {
  //       this.logger.success(`Created new meet "${meet.title}"!`);
  //       return meet;
  //     })
  //     .catch((e) => {
  //       this.logger.handleGraphqlErrors(e);
  //     });
  // }
}
