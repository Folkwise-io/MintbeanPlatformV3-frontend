import { KanbanCanonDao } from "../daos/KanbanCanonDao";
import { LoggerService } from "./loggerService";

export class KanbanCanonService {
  constructor(private kanbanCanonDao: KanbanCanonDao, private logger: LoggerService) {}

  // KanbanCanon
  async fetchKanban(id: string): Promise<KanbanCanon | void> {
    return this.kanbanCanonDao.fetchKanbanCanon(id).catch((e) => {
      this.logger.handleGraphqlErrors(e);
    });
  }
  async createKanban(input: CreateKanbanCanonInput): Promise<KanbanCanon | void> {
    return this.kanbanCanonDao
      .createKanbanCanon(input)
      .then((kanbanCanonCard) => {
        this.logger.success(`Successfully added the **${kanbanCanonCard.title}** Kanban.`);
        return kanbanCanonCard;
      })
      .catch((e) => {
        this.logger.handleGraphqlErrors(e);
      });
  }
  async editKanban(id: string, input: EditKanbanCanonInput): Promise<KanbanCanon | void> {
    return this.kanbanCanonDao
      .editKanbanCanon(id, input)
      .then((kanban) => {
        this.logger.success(`Updated info for the **${kanban.title}** Kanban.`);
        return kanban;
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
  async fetchKanbanCard(id: string): Promise<KanbanCanonCard | void> {
    return this.kanbanCanonDao.fetchKanbanCanonCard(id).catch((e) => {
      this.logger.handleGraphqlErrors(e);
    });
  }
  async createKanbanCard(input: CreateKanbanCanonCardInput): Promise<KanbanCanonCard | void> {
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
  async editKanbanCard(id: string, input: EditKanbanCanonCardInput): Promise<KanbanCanonCard | void> {
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
  async deleteKanbanCard(id: string): Promise<boolean | void> {
    return this.kanbanCanonDao
      .deleteKanbanCanonCard(id)
      .then(() => this.logger.success("Successfully deleted the Kanban Card."))
      .catch((e) => {
        this.logger.handleGraphqlErrors(e);
      });
  }
}
