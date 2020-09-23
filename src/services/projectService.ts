import { ProjectDao } from "../daos/ProjectDao";
import { LoggerService } from "./loggerService";

export class ProjectService {
  constructor(private projectDao: ProjectDao, private logger: LoggerService) {}

  async fetchProject(id: string): Promise<Project | void> {
    return this.projectDao.fetchProject(id).catch((e) => {
      this.logger.handleGraphqlErrors(e);
    });
  }

  async createProject(params: CreateProjectParams): Promise<Project | void> {
    return this.projectDao
      .createProject(params)
      .then((project) => {
        this.logger.success(`Submitted new project <strong>${project.title}</strong>!`);
        return project;
      })
      .catch((e) => {
        this.logger.handleGraphqlErrors(e);
      });
  }
}
