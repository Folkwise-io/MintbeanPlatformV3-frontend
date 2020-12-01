import { KanbanCanonDao } from "../daos/KanbanCanonDao";
import { LoggerService } from "./loggerService";
import { EntityService } from "./entityService";

export class KanbanCanonService extends EntityService {
  constructor(private kanbanCanonDao: KanbanCanonDao, logger: LoggerService) {
    super(logger);
  }

  // KanbanCanon
  async fetchKanbanCanon(id: string): Promise<KanbanCanon | void> {
    return this.handleService(() => this.kanbanCanonDao.fetchKanbanCanon(id));
  }
  async createKanbanCanon(input: CreateKanbanCanonInput): Promise<KanbanCanon | void> {
    return this.handleService(async () => {
      const kanbanCanon = await this.kanbanCanonDao.createKanbanCanon(input);
      this.logger.success(`Successfully added the **${kanbanCanon.title}** Kanban.`);
      return kanbanCanon;
    });
  }
  async editKanbanCanon(id: string, input: EditKanbanCanonInput): Promise<KanbanCanon | void> {
    return this.handleService(async () => {
      const kanbanCanon = await this.kanbanCanonDao.editKanbanCanon(id, input);
      this.logger.success(`Updated info for the **${kanbanCanon.title}** Kanban.`);
      return kanbanCanon;
    });
  }
  async updateCardPositions(id: string, input: UpdateCardPositionInput): Promise<KanbanCardPositions | void> {
    return this.handleService(() => this.kanbanCanonDao.updateCardPositions(id, input));
  }

  // KanbanCanonCard
  async fetchKanbanCanonCard(id: string): Promise<KanbanCanonCard | void> {
    return this.handleService(() => this.kanbanCanonDao.fetchKanbanCanonCard(id));
  }
  async createKanbanCanonCard(input: CreateKanbanCanonCardInput): Promise<KanbanCanonCard | void> {
    return this.handleService(async () => {
      const kanbanCanonCard = await this.kanbanCanonDao.createKanbanCanonCard(input);
      this.logger.success(`Successfully added the card **${kanbanCanonCard.title}**.`);
      return kanbanCanonCard;
    });
  }
  async editKanbanCanonCard(id: string, input: EditKanbanCanonCardInput): Promise<KanbanCanonCard | void> {
    return this.handleService(async () => {
      const kanbanCanonCard = await this.kanbanCanonDao.editKanbanCanonCard(id, input);
      this.logger.success(`Updated info for the card **${kanbanCanonCard.title}**.`);
      return kanbanCanonCard;
    });
  }
  async deleteKanbanCanonCard(id: string): Promise<boolean | void> {
    return this.handleService(async () => {
      const success = await this.kanbanCanonDao.deleteKanbanCanonCard(id);
      this.logger.success("Successfully deleted the Kanban Card.");
      return success;
    });
  }
}
