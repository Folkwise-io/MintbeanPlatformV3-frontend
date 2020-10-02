import { ApiQueryExecutor } from "../api/ApiQueryExecutor";
import { KanbanDao } from "./KanbanDao";
import { isServerErrorArray } from "../utils/typeGuards";

export class KanbanDaoImpl implements KanbanDao {
  constructor(private api: ApiQueryExecutor) {}

  // Kanban ----------------------------------
  // Not connected to backend yet
  fetchKanban(id: string): Promise<Kanban> {
    return (
      this.api
        .query<ApiResponseRaw<{ kanban: Kanban }>, { id: string }>(
          `
            query fetchKanban($id: String!) {
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
  // KanbanCard ----------------------------------
  // Not connected to backend yet
  createKanbanCard(input: CreateKanbanCardInput): Promise<KanbanCard> {
    return (
      this.api
        .query<ApiResponseRaw<{ createKanbanCard: KanbanCard }>, { input: CreateKanbanCardInput }>(
          `
            mutation createKanbanCard($input: CreateKanbanCardInput!) {
              createKanbanCard(input: $input) {
                id
                title 
                body
                index
              }
            }
          `,
          { input },
        )
        .then((result) => {
          if (result.errors) throw result.errors;
          if (!result.errors && !result.data.createKanbanCard) {
            throw [{ message: "Failed to fetch Kanban Card", extensions: { code: "UNEXPECTED" } }];
          }
          return result.data.createKanbanCard;
        })
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        .catch((e: any) => {
          if (isServerErrorArray(e)) throw e;
          throw [{ message: e.message, extensions: { code: "UNEXPECTED" } }];
        })
      /* eslint-enable  @typescript-eslint/no-explicit-any */
    );
  }
  editKanbanCard(id: string, input: EditKanbanCardInput): Promise<KanbanCard> {
    return (
      this.api
        .query<ApiResponseRaw<{ editKanbanCard: KanbanCard }>, { id: string; input: EditKanbanCardInput }>(
          `
            mutation editKanbanCard($input: EditKanbanCardInput!) {
              editKanbanCard(input: $input) {
                id
                title 
                body
                index
              }
            }
          `,
          { id, input },
        )
        .then((result) => {
          if (result.errors) throw result.errors;
          if (!result.errors && !result.data.editKanbanCard) {
            throw [{ message: "Failed to fetch Kanban Card", extensions: { code: "UNEXPECTED" } }];
          }
          return result.data.editKanbanCard;
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
