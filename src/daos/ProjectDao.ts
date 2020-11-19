import { Project, CreateProjectParams } from "../../types";
import { AwardBadgesParams } from "../types/badge";

export interface ProjectDao {
  fetchProject(id: string): Promise<Project>;
  createProject(params: CreateProjectParams): Promise<Project>;
  deleteProject(id: string): Promise<boolean>;
  awardBadges(params: AwardBadgesParams): Promise<Project>;
}
