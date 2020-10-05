import { ApiQueryExecutor } from "../api/ApiQueryExecutor";
import { ProjectDao } from "./ProjectDao";
import { isServerErrorArray } from "../utils/typeGuards";
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
          throw [{ message: "Something went wrong when deleteing project.", extensions: { code: "UNEXPECTED" } }];
        }
        return result.data.deleteProject;
      })
      .catch(handleServerError);
  }
}
