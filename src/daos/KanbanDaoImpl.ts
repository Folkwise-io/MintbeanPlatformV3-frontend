import { ApiQueryExecutor } from "../api/ApiQueryExecutor";
import { KanbanDao } from "./KanbanDao";
import { handleServerError } from "../utils/handleServerError";
import { KANBAN_CANON_CARD_RESPONSE_QUERY } from "./KanbanCanonDaoImpl";

export const KANBAN_RESPONSE_QUERY = `
    id
    title
    description
    kanbanCanonId
    userId
    meetId
    kanbanCards {
      ${KANBAN_CANON_CARD_RESPONSE_QUERY}
    }
    cardPositions {
      todo
      wip
      done
    }
  `;

export class KanbanDaoImpl implements KanbanDao {
  constructor(private api: ApiQueryExecutor) {}

  // Kanban ----------------------------------
  fetchKanban(args: FetchKanbanArgs): Promise<Kanban> {
    return this.api
      .query<ApiResponseRaw<{ kanban: Kanban }>, FetchKanbanArgs>(
        `
            query fetchKanban($kanbanCanonId: UUID!, $userId: UUID!, $meetId: UUID) {
              kanban(kanbanCanonId: $kanbanCanonId, userId: $userId, meetId: $meetId) {
                ${KANBAN_RESPONSE_QUERY}
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
                ${KANBAN_RESPONSE_QUERY}
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
                ${KANBAN_RESPONSE_QUERY}
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
