import { BadgeDao } from "../daos/BadgeDao";
import { Badge, CreateBadgeParams, EditBadgeParams } from "../types/badge";
import { LoggerService } from "./loggerService";
import { EntityService } from "./entityService";

export class BadgeService extends EntityService {
  constructor(private badgeDao: BadgeDao, logger: LoggerService) {
    super(logger);
  }

  async fetchBadges(): Promise<Badge[]> {
    // attempted to convert this to try/catch but it would not throw error properly. Leaving as then/catch
    return this.badgeDao.fetchBadges().catch((e) => {
      this.logger.handleGraphqlErrors(e);
      return [];
    });
  }

  async fetchBadge(id: string): Promise<Badge | void> {
    return this.handleService(() => this.badgeDao.fetchBadge(id));
  }

  async createBadge(input: CreateBadgeParams): Promise<Badge | void> {
    return this.handleService(async () => {
      const newBadge = await this.badgeDao.createBadge(input);
      this.logger.success(`Created new badge **${newBadge.title}**!`);
      return newBadge;
    });
  }

  async deleteBadge(id: string): Promise<boolean | void> {
    return this.handleService(async () => {
      await this.badgeDao.deleteBadge(id);
      this.logger.success("Successfully deleted the badge.");
      return true;
    });
  }

  async editBadge(id: string, params: EditBadgeParams): Promise<Badge | void> {
    return this.handleService(async () => {
      const updatedBadge = await this.badgeDao.editBadge(id, params);
      this.logger.success(`Updated info for badge **${updatedBadge.alias}**`);
      return updatedBadge;
    });
  }
}
