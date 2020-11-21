import { KanbanDao } from "../daos/KanbanDao";
import { LoggerService } from "./loggerService";

export class KanbanService {
  constructor(private kanbanDao: KanbanDao, private logger: LoggerService) {}

  // Kanban
  async fetchKanban(args: FetchKanbanArgs): Promise<Kanban | void> {
    return this.kanbanDao.fetchKanban(args).catch((e: ServerError) => {
      this.logger.handleGraphqlErrors(e);
    });
  }
  async createKanban(input: CreateKanbanInput): Promise<Kanban | void> {
    try {
      const kanban = await this.kanbanDao.createKanban(input);
      this.logger.success(`Congrats! You've unlocked the kanban: **${kanban.title}** .`);
      return kanban;
    } catch (e) {
      this.logger.handleGraphqlErrors(e);
    }
    return;
  }
  async updateCardPositions(id: string, input: UpdateCardPositionInput): Promise<KanbanCardPositions | void> {
    return this.kanbanDao.updateCardPositions(id, input).catch((e) => {
      this.logger.handleGraphqlErrors(e);
    });
  }
}
