import { ApiQueryExecutor } from "../api/ApiQueryExecutor";
import { KanbanCanonDao } from "./KanbanCanonDao";
import { handleServerError } from "../utils/handleServerError";

export const KANBAN_CANON_CARD_RESPONSE_QUERY = `
  id
  kanbanCanonId
  title 
  body
`;
export const KANBAN_CANON_RESPONSE_QUERY = `
    id
    title
    description
    kanbanCanonCards {
      ${KANBAN_CANON_CARD_RESPONSE_QUERY}
    }
    cardPositions {
      todo
      wip
      done
    }
  `;

export class KanbanCanonDaoImpl implements KanbanCanonDao {
  constructor(private api: ApiQueryExecutor) {}

  // KanbanCanon ----------------------------------
  fetchKanbanCanon(id: string): Promise<KanbanCanon> {
    return this.api
      .query<ApiResponseRaw<{ kanbanCanon: KanbanCanon }>, { id: string }>(
        `
            query fetchKanbanCanon($id: UUID!) {
              kanbanCanon(id: $id) {
                ${KANBAN_CANON_RESPONSE_QUERY}
              }
            }
          `,
        { id },
      )
      .then((result) => {
        if (result.errors) throw result.errors;
        if (!result.errors && !result.data.kanbanCanon) {
          throw [{ message: "Failed to fetch kanbanCanon", extensions: { code: "UNEXPECTED" } }];
        }
        return result.data.kanbanCanon;
      })
      .catch(handleServerError);
  }
  createKanbanCanon(input: CreateKanbanCanonInput): Promise<KanbanCanon> {
    return this.api
      .query<ApiResponseRaw<{ createKanbanCanon: KanbanCanon }>, { input: CreateKanbanCanonInput }>(
        `
            mutation createKanbanCanon($input: CreateKanbanCanonInput!) {
              createKanbanCanon(input: $input) {
                ${KANBAN_CANON_RESPONSE_QUERY}
              }
            }
          `,
        { input },
      )
      .then((result) => {
        if (result.errors) throw result.errors;
        if (!result.errors && !result.data.createKanbanCanon) {
          throw [{ message: "Failed to create KanbanCanon", extensions: { code: "UNEXPECTED" } }];
        }
        return result.data.createKanbanCanon;
      })
      .catch(handleServerError);
  }
  editKanbanCanon(id: string, input: EditKanbanCanonInput): Promise<KanbanCanon> {
    return this.api
      .query<ApiResponseRaw<{ editKanbanCanon: KanbanCanon }>, { id: string; input: EditKanbanCanonInput }>(
        `
            mutation editKanbanCanon($id: UUID!, $input: EditKanbanCanonInput!) {
              editKanbanCanon(id: $id, input: $input) {
                ${KANBAN_CANON_RESPONSE_QUERY}
              }
            }
          `,
        { id, input },
      )
      .then((result) => {
        if (result.errors) throw result.errors;
        if (!result.errors && !result.data.editKanbanCanon) {
          throw [{ message: "Failed to update KanbanCanon", extensions: { code: "UNEXPECTED" } }];
        }
        return result.data.editKanbanCanon;
      })
      .catch(handleServerError);
  }
  deleteKanbanCanon(id: string): Promise<boolean> {
    return this.api
      .query<ApiResponseRaw<{ deleteKanbanCanon: boolean }>, { id: string }>(
        `
            mutation deleteKanbanCanon($id: UUID!) {
              deleteKanbanCanon(id: $id)
            }
          `,
        { id },
      )
      .then((result) => {
        if (result.errors) throw result.errors;
        if (!result.errors && !result.data.deleteKanbanCanon) {
          throw [
            {
              message: "Something went wrong when deleting the KanbanCanon.",
              extensions: { code: "UNEXPECTED" },
            },
          ];
        }
        return result.data.deleteKanbanCanon;
      })
      .catch(handleServerError);
  }
  // KanbanCanonCard ----------------------------------
  fetchKanbanCanonCard(id: string): Promise<KanbanCanonCard> {
    return this.api
      .query<ApiResponseRaw<{ kanbanCanonCard: KanbanCanonCard }>, { id: string }>(
        `
            query fetchKanbanCanonCard($id: UUID!) {
              kanbanCanonCard(id: $id) {
                ${KANBAN_CANON_CARD_RESPONSE_QUERY}
              }
            }
          `,
        { id },
      )
      .then((result) => {
        if (result.errors) throw result.errors;
        if (!result.errors && !result.data.kanbanCanonCard) {
          throw [{ message: "Failed to fetch KanbanCanon Card", extensions: { code: "UNEXPECTED" } }];
        }
        return result.data.kanbanCanonCard;
      })
      .catch(handleServerError);
  }
  createKanbanCanonCard(input: CreateKanbanCanonCardInput): Promise<KanbanCanonCard> {
    return this.api
      .query<ApiResponseRaw<{ createKanbanCanonCard: KanbanCanonCard }>, { input: CreateKanbanCanonCardInput }>(
        `
            mutation createKanbanCanonCard($input: CreateKanbanCanonCardInput!) {
              createKanbanCanonCard(input: $input) {
                ${KANBAN_CANON_CARD_RESPONSE_QUERY}
              }
            }
          `,
        { input },
      )
      .then((result) => {
        if (result.errors) throw result.errors;
        if (!result.errors && !result.data.createKanbanCanonCard) {
          throw [{ message: "Failed to fetch KanbanCanon Card", extensions: { code: "UNEXPECTED" } }];
        }
        return result.data.createKanbanCanonCard;
      })
      .catch(handleServerError);
  }
  editKanbanCanonCard(id: string, input: EditKanbanCanonCardInput): Promise<KanbanCanonCard> {
    return this.api
      .query<ApiResponseRaw<{ editKanbanCanonCard: KanbanCanonCard }>, { id: string; input: EditKanbanCanonCardInput }>(
        `
            mutation editKanbanCanonCard($id: UUID!, $input: EditKanbanCanonCardInput!) {
              editKanbanCanonCard(id: $id, input: $input) {
                ${KANBAN_CANON_CARD_RESPONSE_QUERY}
              }
            }
          `,
        { id, input },
      )
      .then((result) => {
        if (result.errors) throw result.errors;
        if (!result.errors && !result.data.editKanbanCanonCard) {
          throw [{ message: "Failed to fetch KanbanCanon Card", extensions: { code: "UNEXPECTED" } }];
        }
        return result.data.editKanbanCanonCard;
      })
      .catch(handleServerError);
  }
  deleteKanbanCanonCard(id: string): Promise<boolean> {
    return this.api
      .query<ApiResponseRaw<{ deleteKanbanCanonCard: boolean }>, { id: string }>(
        `
            mutation deleteKanbanCanonCard($id: UUID!) {
              deleteKanbanCanonCard(id: $id)
            }
          `,
        { id },
      )
      .then((result) => {
        if (result.errors) throw result.errors;
        if (!result.errors && !result.data.deleteKanbanCanonCard) {
          throw [
            {
              message: "Something went wrong when deleting the KanbanCanon Card.",
              extensions: { code: "UNEXPECTED" },
            },
          ];
        }
        return result.data.deleteKanbanCanonCard;
      })
      .catch(handleServerError);
  }
}
