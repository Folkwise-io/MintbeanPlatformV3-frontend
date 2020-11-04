import { KanbanCanonDao } from "../daos/KanbanCanonDao";
import { LoggerService } from "./loggerService";

export class KanbanCanonService {
  constructor(private kanbanCanonDao: KanbanCanonDao, private logger: LoggerService) {}

  // KanbanCanon
  async fetchKanbanCanon(id: string): Promise<KanbanCanon | void> {
    return this.kanbanCanonDao.fetchKanbanCanon(id).catch((e) => {
      this.logger.handleGraphqlErrors(e);
    });
  }
  async createKanbanCanon(input: CreateKanbanCanonInput): Promise<KanbanCanon | void> {
    return this.kanbanCanonDao
      .createKanbanCanon(input)
      .then((kanbanCanon) => {
        this.logger.success(`Successfully added the **${kanbanCanon.title}** Kanban.`);
        return kanbanCanon;
      })
      .catch((e) => {
        this.logger.handleGraphqlErrors(e);
      });
  }
  async editKanbanCanon(id: string, input: EditKanbanCanonInput): Promise<KanbanCanon | void> {
    return this.kanbanCanonDao
      .editKanbanCanon(id, input)
      .then((kanbanCanon) => {
        this.logger.success(`Updated info for the **${kanbanCanon.title}** Kanban.`);
        return kanbanCanon;
      })
      .catch((e) => {
        this.logger.handleGraphqlErrors(e);
      });
  }
  async deleteKanbanCanon(id: string): Promise<boolean | void> {
    return this.kanbanCanonDao
      .deleteKanbanCanon(id)
      .then(() => this.logger.success("Successfully deleted the Kanban."))
      .catch((e) => {
        this.logger.handleGraphqlErrors(e);
      });
  }
  // KanbanCanonCard
  async fetchKanbanCanonCard(id: string): Promise<KanbanCanonCard | void> {
    return this.kanbanCanonDao.fetchKanbanCanonCard(id).catch((e) => {
      this.logger.handleGraphqlErrors(e);
    });
  }
  async createKanbanCanonCard(input: CreateKanbanCanonCardInput): Promise<KanbanCanonCard | void> {
    return this.kanbanCanonDao
      .createKanbanCanonCard(input)
      .then((kanbanCanonCard) => {
        this.logger.success(`Successfully added the card **${kanbanCanonCard.title}**.`);
        return kanbanCanonCard;
      })
      .catch((e) => {
        this.logger.handleGraphqlErrors(e);
      });
  }
  async editKanbanCanonCard(id: string, input: EditKanbanCanonCardInput): Promise<KanbanCanonCard | void> {
    return this.kanbanCanonDao
      .editKanbanCanonCard(id, input)
      .then((kanbanCanonCard) => {
        this.logger.success(`Updated info for the card **${kanbanCanonCard.title}**.`);
        return kanbanCanonCard;
      })
      .catch((e) => {
        this.logger.handleGraphqlErrors(e);
      });
  }
  async deleteKanbanCanonCard(id: string): Promise<boolean | void> {
    return this.kanbanCanonDao
      .deleteKanbanCanonCard(id)
      .then(() => this.logger.success("Successfully deleted the Kanban Card."))
      .catch((e) => {
        this.logger.handleGraphqlErrors(e);
      });
  }
}
