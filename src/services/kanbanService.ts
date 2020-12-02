import { KanbanDao } from "../daos/KanbanDao";
import { LoggerService } from "./loggerService";
import { EntityService } from "./entityService";

export class KanbanService extends EntityService {
  constructor(private kanbanDao: KanbanDao, logger: LoggerService) {
    super(logger);
  }

  async fetchKanban(args: FetchKanbanArgs): Promise<Kanban | void> {
    return this.handleService(() => this.kanbanDao.fetchKanban(args));
  }
  async createKanban(input: CreateKanbanInput): Promise<Kanban | void> {
    return this.handleService(async () => {
      const kanban = await this.kanbanDao.createKanban(input);
      this.logger.success(`Congrats! You've unlocked the kanban: **${kanban.title}** .`);
      return kanban;
    });
  }
  async updateCardPositions(id: string, input: UpdateCardPositionInput): Promise<KanbanCardPositions | void> {
    return this.handleService(() => this.kanbanDao.updateCardPositions(id, input));
  }
}
