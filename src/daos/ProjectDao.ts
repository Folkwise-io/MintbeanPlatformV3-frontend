export interface ProjectDao {
  fetchProject(id: string): Promise<Project>;
  createProject(params: CreateProjectParams): Promise<Project>;
  deleteProject(id: string): Promise<boolean>;
  awardBadgesToProject(projectId: string, badgeIds: string[]): Promise<Project>;
}
