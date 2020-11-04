import { ApiQueryExecutor } from "../api/ApiQueryExecutor";
import { KanbanDao } from "./KanbanDao";
import { handleServerError } from "../utils/handleServerError";

export class KanbanDaoImpl implements KanbanDao {
  constructor(private api: ApiQueryExecutor) {}

  // Kanban ----------------------------------
  fetchKanban(args: FetchKanbanArgs): Promise<Kanban> {
    return this.api
      .query<ApiResponseRaw<{ kanban: Kanban }>, FetchKanbanArgs>(
        `
            query fetchKanban($kanbanCanonId: UUID!, $userId: UUID!, $meetId: UUID) {
              kanban(kanbanCanonId: $kanbanCanonId, userId: $userId, meetId: $meetId) {
                id
                userId
                kanbanCanonId
                meetId
                title 
                description
                kanbanCards {
                  id
                  title
                  body
                  status
                }
              }
            }
          `,
        { ...args },
      )
      .then((result) => {
        if (result.errors) throw result.errors;
        if (!result.errors && !result.data.kanban) {
          throw [{ message: "Failed to fetch kanban", extensions: { code: "UNEXPECTED" } }];
        }
        return result.data.kanban;
      })
      .catch(handleServerError);
  }

  createKanban(input: CreateKanbanInput): Promise<Kanban> {
    return this.api
      .query<ApiResponseRaw<{ createKanban: Kanban }>, { input: CreateKanbanInput }>(
        `
            mutation createKanban($input: CreateKanbanInput!) {
              createKanban(input: $input) {
                id
                userId
                kanbanCanonId
                meetId
                title 
                description
                kanbanCards {
                  id
                  title
                  body
                  status
                }
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
      .catch(handleServerError);
  }

  // KanbanCard
  // TODO: restructurure input to separate identification keys?
  updateKanbanCard(input: UpdateKanbanCardInput): Promise<KanbanCard> {
    return this.api
      .query<ApiResponseRaw<{ updateKanbanCard: KanbanCard }>, { input: UpdateKanbanCardInput }>(
        `
            mutation updateKanbanCard($input: UpdateKanbanCardInput!) {
              updateKanbanCard(input: $input) {
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
        if (!result.errors && !result.data.updateKanbanCard) {
          throw [{ message: "Failed to update kanban card", extensions: { code: "UNEXPECTED" } }];
        }
        return result.data.updateKanbanCard;
      })
      .catch(handleServerError);
  }
}
