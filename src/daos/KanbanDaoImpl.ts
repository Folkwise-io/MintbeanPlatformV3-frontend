import { ApiQueryExecutor } from "../api/ApiQueryExecutor";
import { KanbanDao } from "./KanbanDao";
import { handleServerError } from "../utils/handleServerError";

// note: currently same query as in KanbanCanonDao's card query, but purposefully decoupled for future-proofing
const KANBAN_CARD_RESPONSE_QUERY = `
  id
  kanbanCanonId
  title 
  body
`;

export const KANBAN_RESPONSE_QUERY = `
    id
    title
    description
    kanbanCanonId
    userId
    meetId
    kanbanCards {
      ${KANBAN_CARD_RESPONSE_QUERY}
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
  // Currently only supports lookup by ID in frontend since we get resolved kanbanId from meet.
  // Backend also allows a composite lookup of kanbanCanonId + userId + (meetId?)
  fetchKanban(args: FetchKanbanArgs): Promise<Kanban> {
    return this.api
      .query<ApiResponseRaw<{ kanban: Kanban }>, FetchKanbanArgs>(
        `
            query fetchKanban($id: UUID!) {
              kanban(id: $id) {
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
