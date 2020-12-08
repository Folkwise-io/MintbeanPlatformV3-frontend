import { ApiQueryExecutor } from "../api/ApiQueryExecutor";
import { ProjectDao } from "./ProjectDao";
import { handleServerError } from "../utils/handleServerError";
import { Project } from "../types/project";

export class ProjectDaoImpl implements ProjectDao {
  constructor(private api: ApiQueryExecutor) {}

  fetchProject(id: string): Promise<Project> {
    return this.api
      .query<ApiResponseRaw<{ project: Project }>, { id: string }>(
        `
          query projectForShowPage($id: UUID!) {
            project(id: $id) {
              id
              title
              sourceCodeUrl
              liveUrl
              createdAt
              meet {
                id
                title
              }
              user {
                firstName
                lastName
                id
              }
              mediaAssets {
                cloudinaryPublicId
              }
              badges {
                id
                title
                alias
                badgeShape
                faIcon
                backgroundHex
                iconHex
                weight
              }
            }
          }
        `,
        { id },
      )
      .then((result) => {
        if (result.errors) throw result.errors;
        if (!result.errors && !result.data.project) {
          throw [{ message: "Failed to get project", extensions: { code: "UNEXPECTED" } }];
        }
        return result.data.project;
      })
      .catch(handleServerError);
  }

  createProject(params: CreateProjectInput): Promise<Project> {
    return this.api
      .query<ApiResponseRaw<{ createProject: Project }>, { input: CreateProjectInput }>(
        `
          mutation createProject($input: CreateProjectInput!) {
            createProject(input: $input) {
              id
              title
              sourceCodeUrl
              liveUrl
              createdAt
              meet {
                id
                title
              }
              user {
                firstName
                lastName
              }
              mediaAssets {
                cloudinaryPublicId
              }
            }
          }
        `,
        { input: params },
      )
      .then((result) => {
        if (result.errors) throw result.errors;
        if (!result.errors && !result.data.createProject) {
          throw [{ message: "Something went wrong when creating project.", extensions: { code: "UNEXPECTED" } }];
        }
        return result.data.createProject;
      })
      .catch(handleServerError);
  }
  deleteProject(id: string): Promise<boolean> {
    return this.api
      .query<ApiResponseRaw<{ deleteProject: boolean }>, { id: string }>(
        `
            mutation deleteProject($id: UUID!) {
              deleteProject(id: $id)
            }
          `,
        { id },
      )
      .then((result) => {
        if (result.errors) throw result.errors;
        if (!result.errors && !result.data.deleteProject) {
          throw [{ message: "Something went wrong when deleting project.", extensions: { code: "UNEXPECTED" } }];
        }
        return result.data.deleteProject;
      })
      .catch(handleServerError);
  }
  awardBadgesToProject(projectId: string, badgeIds: string[]): Promise<Project> {
    return this.api
      .query<ApiResponseRaw<{ awardBadgesToProject: Project }>, { projectId: string; badgeIds: string[] }>(
        `
      mutation awardBadgesToProject($projectId: UUID!, $badgeIds:[UUID]!) {
        awardBadgesToProject(projectId: $projectId, badgeIds: $badgeIds) {
          id
          title
          sourceCodeUrl
          liveUrl
          badges {
            alias
            title
          }
        }
      }
      `,
        { projectId, badgeIds },
      )
      .then((result) => {
        if (result.errors) throw result.errors;
        if (!result.errors && !result.data.awardBadgesToProject) {
          throw [{ message: "Something went wrong when awarding badges.", extensions: { code: "UNEXPECTED" } }];
        }
        return result.data.awardBadgesToProject;
      })
      .catch(handleServerError);
  }
}
