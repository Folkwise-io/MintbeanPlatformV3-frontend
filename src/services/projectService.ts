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
    try {
      const success = await this.projectDao.deleteProject(id);
      this.logger.success("Successfully deleted the project.");
      return success;
    } catch (e) {
      this.logger.handleGraphqlErrors(e);
    }
  }

  async createProject(params: CreateProjectInput): Promise<Project | void> {
    try {
      const project = await this.projectDao.createProject(params);
      this.logger.success(`Submitted new project **${project.title}**!`);
      return project;
    } catch (e) {
      this.logger.handleGraphqlErrors(e);
    }
  }
}
