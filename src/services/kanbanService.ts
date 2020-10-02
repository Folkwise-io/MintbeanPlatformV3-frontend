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
  // KanbanCard
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
}
