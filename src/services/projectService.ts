import { ProjectDao } from "../daos/ProjectDao";
import { LoggerService } from "./loggerService";

export class ProjectService {
  constructor(private projectDao: ProjectDao, private logger: LoggerService) {}

  async fetchProject(id: string): Promise<Project | void> {
    return this.projectDao.fetchProject(id).catch((e) => {
      this.logger.handleGraphqlErrors(e);
    });
  }

  async deleteProject(id: string): Promise<boolean | void> {
    return this.projectDao
      .deleteProject(id)
      .then(() => this.logger.success("Successfully deleted the project."))
      .catch((e) => {
        this.logger.handleGraphqlErrors(e);
      });
  }

  async createProject(params: CreateProjectParams): Promise<Project | void> {
    return this.projectDao
      .createProject(params)
      .then((project) => {
        this.logger.success(`Submitted new project **${project.title}**!`);
        return project;
      })
      .catch((e) => {
        this.logger.handleGraphqlErrors(e);
      });
  }

  async awardBadgesToProject(projectId: string, badgeIds: string[]): Promise<Project | void> {
    return this.projectDao
      .awardBadgesToProject(projectId, badgeIds)
      .then((project) => {
        this.logger.success(`Awarded badges to **${project.title}**!`);
        return project;
      })
      .catch((e) => {
        this.logger.handleGraphqlErrors(e);
      });
  }
}
