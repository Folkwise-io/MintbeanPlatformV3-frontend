import { ProjectDao } from "../daos/ProjectDao";
import { EntityService } from "./entityService";
import { LoggerService } from "./loggerService";

export class ProjectService extends EntityService {
  constructor(private projectDao: ProjectDao, logger: LoggerService) {
    super(logger);
  }

  async fetchProject(id: string): Promise<Project | void> {
    return this.handleService(() => this.projectDao.fetchProject(id));
  }

  async deleteProject(id: string): Promise<boolean | void> {
    return this.handleService(async () => {
      const success = await this.projectDao.deleteProject(id);
      this.logger.success("Successfully deleted the project.");
      return success;
    });
  }

  async createProject(params: CreateProjectInput): Promise<Project | void> {
    return this.handleService(async () => {
      const project = await this.projectDao.createProject(params);
      this.logger.success(`Submitted new project **${project.title}**!`);
      return project;
    });
  }

  async awardBadgesToProject(projectId: string, badgeIds: string[]): Promise<Project | void> {
    return this.handleService(async () => {
      const project = await this.projectDao.awardBadgesToProject(projectId, badgeIds);
      this.logger.success(`Awarded badges to **${project.title}**!`);
      return project;
    });
  }
}
