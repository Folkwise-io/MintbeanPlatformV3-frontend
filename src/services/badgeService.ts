import { BadgeDao } from "../daos/BadgeDao";
import { Badge, CreateBadgeParams, EditBadgeParams } from "../types/badge";
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
  async createBadge(params: CreateBadgeParams): Promise<Badge | void> {
    return this.badgeDao
      .createBadge(params)
      .then((badge) => {
        badge && this.logger.success(`Created new badge **${badge.title}**!`);
        return badge;
      })
      .catch((e) => {
        this.logger.handleGraphqlErrors(e);
      });
  }

  async deleteBadge(badgeId: string): Promise<boolean | void> {
    return this.badgeDao
      .deleteBadge(badgeId)
      .then(() => this.logger.success("Successfully deleted the badge."))
      .catch((e) => {
        this.logger.handleGraphqlErrors(e);
      });
  }
  async editBadge(badgeId: string, params: EditBadgeParams): Promise<Badge | void> {
    return this.badgeDao
      .editBadge(badgeId, params)
      .then((badge) => {
        this.logger.success(`Updated info for badge **${badge.alias}**`);
        return badge;
      })
      .catch((e) => {
        this.logger.handleGraphqlErrors(e);
      });
  }
}
