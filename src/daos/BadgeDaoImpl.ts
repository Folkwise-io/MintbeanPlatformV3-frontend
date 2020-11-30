import { ApiQueryExecutor } from "../api/ApiQueryExecutor";
import { BadgeDao } from "./BadgeDao";
import { handleServerError } from "../utils/handleServerError";
import { Badge, CreateBadgeParams, EditBadgeParams } from "../types/badge";

const BADGE_INPUT_RETURN_QUERY = `
  id
  alias
  badgeShape
  faIcon
  backgroundHex
  iconHex
  title
  description
  weight
`;

export class BadgeDaoImpl implements BadgeDao {
  constructor(private api: ApiQueryExecutor) {}
  fetchBadges(): Promise<Badge[]> {
    //shallow badges, just enough to view all badges
    return this.api
      .query<ApiResponseRaw<{ badges: Badge[] }>>(
        `
      query badges {
        badges {
          id
          alias
          badgeShape
          faIcon
          backgroundHex
          iconHex
          title
          weight
        }
      }
      `,
      )
      .then((result) => {
        if (result.errors) throw result.errors;
        if (!result.errors && !result.data.badges) {
          throw [{ message: "Failed to get meets", extensions: { code: "UNEXPECTED" } }];
        }
        return result.data.badges;
      })
      .catch(handleServerError);
  }
  fetchBadge(id: string): Promise<Badge> {
    return this.api
      .query<ApiResponseRaw<{ badge: Badge }>, { id: string }>(
        `
      query badge($id: UUID!) {
        badge(id: $id) {
          id
          alias
          badgeShape
          faIcon
          backgroundHex
          iconHex
          title
          description
          weight
          projects {
            id
            title
          }
        }
      }
      `,
        { id },
      )
      .then((result) => {
        if (result.errors) throw result.errors;
        if (!result.errors && !result.data.badge) {
          throw [{ message: "Failed to get badge", extensions: { code: "UNEXPECTED" } }];
        }
        return result.data.badge;
      })
      .catch(handleServerError);
  }
  createBadge(params: CreateBadgeParams): Promise<Badge> {
    return this.api
      .query<ApiResponseRaw<{ createBadge: Badge }>, { input: CreateBadgeParams }>(
        `
      mutation createBadge($input: CreateBadgeInput!) {
        createBadge(input: $input) {
          ${BADGE_INPUT_RETURN_QUERY}
        }
      }
      `,
        { input: params },
      )
      .then((result) => {
        if (result.errors) throw result.errors;
        if (!result.errors && !result.data.createBadge) {
          throw [{ message: "Something went wrong when creating badge.", extensions: { code: "UNEXPECTED" } }];
        }
        return result.data.createBadge;
      })
      .catch(handleServerError);
  }
  deleteBadge(id: string): Promise<boolean> {
    return this.api
      .query<ApiResponseRaw<{ deleteBadge: boolean }>, { id: string }>(
        `
      mutation deleteBadge($id: UUID!) {
        deleteBadge(id: $id)
      }
      `,
        { id },
      )
      .then((result) => {
        if (result.errors) throw result.errors;
        if (!result.errors && !result.data.deleteBadge) {
          throw [{ message: "Something went wrong when deleting the badge.", extensions: { code: "UNEXPECTED" } }];
        }
        return result.data.deleteBadge;
      })
      .catch(handleServerError);
  }
  editBadge(id: string, params: EditBadgeParams): Promise<Badge> {
    return this.api
      .query<ApiResponseRaw<{ editBadge: Badge }>, { id: string; input: EditBadgeParams }>(
        `
      mutation editBadge($id: UUID!, $input: EditBadgeInput!) {
        editBadge(id: $id, input: $input) {
          ${BADGE_INPUT_RETURN_QUERY}
        }
      }
      `,
        { id, input: params },
      )
      .then((result) => {
        if (result.errors) throw result.errors;
        if (!result.errors && !result.data.editBadge) {
          throw [{ message: "Something went wrong when editing badge.", extensions: { code: "UNEXPECTED" } }];
        }
        return result.data.editBadge;
      })
      .catch(handleServerError);
  }
}
