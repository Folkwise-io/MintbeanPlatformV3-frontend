import { ApiQueryExecutor } from "../api/ApiQueryExecutor";
import { ProjectDao } from "./ProjectDao";
import { handleServerError } from "../utils/handleServerError";

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

  createProject(params: CreateProjectParams): Promise<Project> {
    return this.api
      .query<ApiResponseRaw<{ createProject: Project }>, { input: CreateProjectParams }>(
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
  awardBadges(projectId: string, badgeIds: string[]): Promise<Project> {
    return this.api
      .query<ApiResponseRaw<{ awardBadges: Project }>, { projectId: string; badgeIds: string[] }>(
        `
      mutation awardBadges($projectId: UUID!, $badgeIds:[UUID]!) {
        awardBadges(projectId: $projectId, badgeIds: $badgeIds) {
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
            alias
          }
        }
      }
      `,
        { projectId, badgeIds },
      )
      .then((result) => {
        if (result.errors) throw result.errors;
        if (!result.errors && !result.data.awardBadges) {
          throw [{ message: "Something went wrong when awarding badges.", extensions: { code: "UNEXPECTED" } }];
        }
        return result.data.awardBadges;
      })
      .catch(handleServerError);
  }
}
