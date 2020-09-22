export interface ProjectDao {
  fetchProject(id: string): Promise<Project>;
  createProject(params: CreateProjectParams): Project;
}
