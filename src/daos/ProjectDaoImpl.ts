import { ApiQueryExecutor } from "../api/ApiQueryExecutor";
import { ProjectDao } from "./ProjectDao";
import { isServerErrorArray } from "../utils/typeGuards";

export class ProjectDaoImpl implements ProjectDao {
  constructor(private api: ApiQueryExecutor) {}

  fetchProject(): Promise<Project> {
    return (
      this.api
        .query<ApiResponseRaw<{ project: Project }>>(
          `
          query projectForShowPage {
            project {
              id
              title
              sourceCodeUrl
              liveUrl
              createdAt
              meetId
              meet: {
                idea
                title
              }
              user: {
                firstName
                lastName
                username
              }
            }
          }
        `,
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
}
