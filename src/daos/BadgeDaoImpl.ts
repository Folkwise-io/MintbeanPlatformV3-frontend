import { ApiQueryExecutor } from "../api/ApiQueryExecutor";
import { BadgeDao } from "./BadgeDao";
import { handleServerError } from "../utils/handleServerError";
import { Badge } from "../types/badge";

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
        { badgeId: badgeId },
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
}
