export interface ProjectDao {
  fetchProject(id: string): Promise<Project>;
}
