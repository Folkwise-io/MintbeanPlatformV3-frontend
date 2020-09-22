import { ApiQueryExecutor } from "../api/ApiQueryExecutor";
import { ProjectDao } from "./ProjectDao";
import { isServerErrorArray } from "../utils/typeGuards";

export class ProjectDaoImpl implements ProjectDao {
  constructor(private api: ApiQueryExecutor) {}

  fetchProject(id: string): Promise<Project> {
    return (
      this.api
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
                username
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
        // TODO: What potential Types of errors can invoke this catch?
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        .catch((e: any) => {
          if (isServerErrorArray(e)) throw e;
          throw [{ message: e.message, extensions: { code: "UNEXPECTED" } }];
        })
      /* eslint-enable  @typescript-eslint/no-explicit-any */
    );
  }

  createProject(params: CreateProjectParams): Promise<Project> {
    return (
      this.api
        .query<ApiResponseRaw<{ createProject: Project }>, { input: CreateProjectParams }>(
          `
          mutation createProject($input: CreateProjectInput!) {
            createMeet(input: $input) {
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
                username
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
        // TODO: What potential Types of errors can invoke this catch?
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        .catch((e: any) => {
          if (isServerErrorArray(e)) throw e;
          throw [{ message: e.message, extensions: { code: "UNEXPECTED" } }];
        })
      /* eslint-enable  @typescript-eslint/no-explicit-any */
    );
  }
}
