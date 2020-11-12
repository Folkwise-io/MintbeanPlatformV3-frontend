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

  updateCardPositions(id: string, input: UpdateCardPositionInput): Promise<KanbanCardPositions> {
    return this.api
      .query<
        ApiResponseRaw<{ updateKanbanCardPositions: KanbanCardPositions }>,
        { id: string; input: UpdateCardPositionInput }
      >(
        `
          mutation updateKanbanCardPositions($id: UUID!, $input: UpdateCardPositionInput!) {
            updateKanbanCardPositions(id: $id, input: $input) {
              todo
              wip
              done
            }
          }
          `,
        { id, input },
      )
      .then((result) => {
        if (result.errors) throw result.errors;
        if (!result.errors && !result.data.updateKanbanCardPositions) {
          throw [
            {
              message:
                "Something went wrong when updating card positions for this Kanban. Your changes may not persist after refreshing the page",
              extensions: { code: "UNEXPECTED" },
            },
          ];
        }
        return result.data.updateKanbanCardPositions;
      })
      .catch(handleServerError);
  }
}
