import { BadgeDao } from "../daos/BadgeDao";
import { Badge } from "../types/badge";
import { LoggerService } from "./loggerService";

export class BadgeService {
  constructor(private badgeDao: BadgeDao, private logger: LoggerService) {}
  async fetchBadges(): Promise<Badge[]> {
    return this.badgeDao.fetchBadges().catch((e) => {
      this.logger.handleGraphqlErrors(e);
      return [];
    });
  }
  async fetchBadge(badgeId: string): Promise<Badge | void> {
    return this.badgeDao.fetchBadge(badgeId).catch((e) => {
      this.logger.handleGraphqlErrors(e);
    });
  }
}
