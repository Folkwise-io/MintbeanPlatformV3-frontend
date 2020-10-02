import { KanbanDao } from "../daos/KanbanDao";
import { LoggerService } from "./loggerService";

export class KanbanService {
  constructor(private kanbanDao: KanbanDao, private logger: LoggerService) {}

  // Kanban
  async fetchKanban(id: string): Promise<Kanban | void> {
    return this.kanbanDao.fetchKanban(id).catch((e) => {
      this.logger.handleGraphqlErrors(e);
    });
  }
  async createKanban(input: CreateKanbanInput): Promise<Kanban | void> {
    return this.kanbanDao
      .createKanban(input)
      .then((kanbanCard) => {
        this.logger.success(`Successfully added the **${kanbanCard.title}** Kanban.`);
        return kanbanCard;
      })
      .catch((e) => {
        this.logger.handleGraphqlErrors(e);
      });
  }
  async editKanban(id: string, input: EditKanbanInput): Promise<Kanban | void> {
    return this.kanbanDao
      .editKanban(id, input)
      .then((kanban) => {
        this.logger.success(`Updated info for the **${kanban.title}** Kanban.`);
        return kanban;
      })
      .catch((e) => {
        this.logger.handleGraphqlErrors(e);
      });
  }
  async deleteKanban(id: string): Promise<boolean | void> {
    return this.kanbanDao
      .deleteKanban(id)
      .then(() => this.logger.success("Successfully deleted the Kanban."))
      .catch((e) => {
        this.logger.handleGraphqlErrors(e);
      });
  }
  // KanbanCard
  async fetchKanbanCard(id: string): Promise<KanbanCard | void> {
    return this.kanbanDao.fetchKanbanCard(id).catch((e) => {
      this.logger.handleGraphqlErrors(e);
    });
  }
  async createKanbanCard(input: CreateKanbanCardInput): Promise<KanbanCard | void> {
    return this.kanbanDao
      .createKanbanCard(input)
      .then((kanbanCard) => {
        this.logger.success(`Successfully added the card **${kanbanCard.title}**.`);
        return kanbanCard;
      })
      .catch((e) => {
        this.logger.handleGraphqlErrors(e);
      });
  }
  async editKanbanCard(id: string, input: EditKanbanCardInput): Promise<KanbanCard | void> {
    return this.kanbanDao
      .editKanbanCard(id, input)
      .then((kanbanCard) => {
        this.logger.success(`Updated info for the card **${kanbanCard.title}**.`);
        return kanbanCard;
      })
      .catch((e) => {
        this.logger.handleGraphqlErrors(e);
      });
  }
  async deleteKanbanCard(id: string): Promise<boolean | void> {
    return this.kanbanDao
      .deleteKanbanCard(id)
      .then(() => this.logger.success("Successfully deleted the Kanban Card."))
      .catch((e) => {
        this.logger.handleGraphqlErrors(e);
      });
  }
}
