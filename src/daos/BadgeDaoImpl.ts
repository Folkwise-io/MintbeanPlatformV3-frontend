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
}
