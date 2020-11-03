import { BadgeDao } from "../daos/BadgeDao";
import { LoggerService } from "./loggerService";

export class BadgeService {
  constructor(private badgeDao: BadgeDao, private logger: LoggerService) {}
  async fetchBadges(): Promise<Badge[]> {
    return this.badgeDao.fetchBadges().catch((e) => {
      this.logger.handleGraphqlErrors(e);
      return [];
    });
  }
}
