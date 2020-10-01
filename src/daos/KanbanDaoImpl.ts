import { ApiQueryExecutor } from "../api/ApiQueryExecutor";
import { KanbanDao } from "./KanbanDao";
import { isServerErrorArray } from "../utils/typeGuards";

export class KanbanDaoImpl implements KanbanDao {
  constructor(private api: ApiQueryExecutor) {}

  // Kanban ----------------------------------
  fetchKanban(id: string): Promise<Kanban> {
    return (
      this.api
        .query<ApiResponseRaw<{ kanban: Kanban }>, { id: string }>(
          `
            query fetchKanbanById($id: String!) {
              kanban(id: $id) {
                id
                title 
                description
              }
            }
          `,
          { id },
        )
        .then((result) => {
          if (result.errors) throw result.errors;
          if (!result.errors && !result.data.kanban) {
            throw [{ message: "Failed to fetch kanban", extensions: { code: "UNEXPECTED" } }];
          }
          return result.data.kanban;
        })
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        .catch((e: any) => {
          if (isServerErrorArray(e)) throw e;
          throw [{ message: e.message, extensions: { code: "UNEXPECTED" } }];
        })
      /* eslint-enable  @typescript-eslint/no-explicit-any */
    );
  }
}
