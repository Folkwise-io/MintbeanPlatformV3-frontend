import { ApiQueryExecutor } from "../api/ApiQueryExecutor";
import { BadgeDao } from "./BadgeDao";
import { handleServerError } from "../utils/handleServerError";
import { Badge, CreateBadgeParams, EditBadgeParams } from "../types/badge";

export class BadgeDaoImpl implements BadgeDao {
  constructor(private api: ApiQueryExecutor) {}
  fetchBadges(): Promise<Badge[]> {
    return this.api
      .query<ApiResponseRaw<{ badges: Badge[] }>>(
        `
      query badges {
        badges {
          badgeId
          alias
          badgeShape
          faIcon
          backgroundHex
          iconHex
          title
          description
          weight
          createdAt
          updatedAt
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
  fetchBadge(badgeId: string): Promise<Badge> {
    return this.api
      .query<ApiResponseRaw<{ badge: Badge }>, { badgeId: string }>(
        `
      query badge($badgeId: UUID!) {
        badge(badgeId: $badgeId) {
          badgeId
          alias
          badgeShape
          faIcon
          backgroundHex
          iconHex
          title
          description
          weight
          createdAt
        }
      }
      `,
        { badgeId },
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
          badgeId
          badgeShape
          alias
          title
          faIcon
          weight
          backgroundHex
          iconHex
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
  deleteBadge(badgeId: string): Promise<boolean> {
    return this.api
      .query<ApiResponseRaw<{ deleteBadge: boolean }>, { badgeId: string }>(
        `
      mutation deleteBadge($badgeId: UUID = "c4465b88-57da-4f70-b8be-3555de8fc81b") {
        deleteBadge(badgeId: $badgeId)
      }
      `,
        { badgeId },
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
  editBadge(badgeId: string, params: EditBadgeParams): Promise<Badge> {
    return this.api
      .query<ApiResponseRaw<{ editBadge: Badge }>, { badgeId: string; input: EditBadgeParams }>(
        `
      mutation editBadge($badgeId: UUID!, $input: EditBadgeInput!) {
        editBadge(badgeId: $badgeId, input: $input) {
          alias
          badgeShape
          faIcon
          backgroundHex
          iconHex
          title
          description
          weight
          createdAt
          updatedAt
        }
      }
      `,
        { badgeId, input: params },
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
