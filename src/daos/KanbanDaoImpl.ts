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
  // Not connected to backend yet
  createKanban(input: CreateKanbanInput): Promise<Kanban> {
    return (
      this.api
        .query<ApiResponseRaw<{ createKanban: Kanban }>, { input: CreateKanbanInput }>(
          `
            mutation createKanban($input: CreateKanbanInput!) {
              createKanban(input: $input) {
                id
                title 
                description
              }
            }
          `,
          { input },
        )
        .then((result) => {
          if (result.errors) throw result.errors;
          if (!result.errors && !result.data.createKanban) {
            throw [{ message: "Failed to create Kanban", extensions: { code: "UNEXPECTED" } }];
          }
          return result.data.createKanban;
        })
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        .catch((e: any) => {
          if (isServerErrorArray(e)) throw e;
          throw [{ message: e.message, extensions: { code: "UNEXPECTED" } }];
        })
      /* eslint-enable  @typescript-eslint/no-explicit-any */
    );
  }
  // Not connected to backend yet
  editKanban(id: string, input: EditKanbanInput): Promise<Kanban> {
    return (
      this.api
        .query<ApiResponseRaw<{ editKanban: Kanban }>, { id: string; input: EditKanbanInput }>(
          `
            mutation editKanban($input: EditKanbanCardInput!) {
              editKanban(input: $input) {
                id
                title 
                description
              }
            }
          `,
          { id, input },
        )
        .then((result) => {
          if (result.errors) throw result.errors;
          if (!result.errors && !result.data.editKanban) {
            throw [{ message: "Failed to update Kanban", extensions: { code: "UNEXPECTED" } }];
          }
          return result.data.editKanban;
        })
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        .catch((e: any) => {
          if (isServerErrorArray(e)) throw e;
          throw [{ message: e.message, extensions: { code: "UNEXPECTED" } }];
        })
      /* eslint-enable  @typescript-eslint/no-explicit-any */
    );
  }
  // Not connected to backend yet
  deleteKanban(id: string): Promise<boolean> {
    return (
      this.api
        .query<ApiResponseRaw<{ deleteKanban: boolean }>, { id: string }>(
          `
            mutation deleteKanban($id: UUID!) {
              deleteKanban(id: $id)
            }
          `,
          { id },
        )
        .then((result) => {
          if (result.errors) throw result.errors;
          if (!result.errors && !result.data.deleteKanban) {
            throw [
              {
                message: "Something went wrong when deleting the Kanban.",
                extensions: { code: "UNEXPECTED" },
              },
            ];
          }
          return result.data.deleteKanban;
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
  fetchKanbanCard(id: string): Promise<KanbanCard> {
    return (
      this.api
        .query<ApiResponseRaw<{ kanbanCard: KanbanCard }>, { id: string }>(
          `
            query fetchKanbanCard($id: String!) {
              kanbanCard(id: $id) {
                id
                title 
                body
              }
            }
          `,
          { id },
        )
        .then((result) => {
          if (result.errors) throw result.errors;
          if (!result.errors && !result.data.kanbanCard) {
            throw [{ message: "Failed to fetch Kanban Card", extensions: { code: "UNEXPECTED" } }];
          }
          return result.data.kanbanCard;
        })
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        .catch((e: any) => {
          if (isServerErrorArray(e)) throw e;
          throw [{ message: e.message, extensions: { code: "UNEXPECTED" } }];
        })
      /* eslint-enable  @typescript-eslint/no-explicit-any */
    );
  }
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
  // Not connected to backend yet
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
  // Not connected to backend yet
  deleteKanbanCard(id: string): Promise<boolean> {
    return (
      this.api
        .query<ApiResponseRaw<{ deleteKanbanCard: boolean }>, { id: string }>(
          `
            mutation deleteKanbanCard($id: UUID!) {
              deleteKanbanCard(id: $id)
            }
          `,
          { id },
        )
        .then((result) => {
          if (result.errors) throw result.errors;
          if (!result.errors && !result.data.deleteKanbanCard) {
            throw [
              {
                message: "Something went wrong when deleting the Kanban Card.",
                extensions: { code: "UNEXPECTED" },
              },
            ];
          }
          return result.data.deleteKanbanCard;
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
