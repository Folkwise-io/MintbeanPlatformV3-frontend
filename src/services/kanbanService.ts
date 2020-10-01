import { KanbanDao } from "../daos/KanbanDao";
import { LoggerService } from "./loggerService";

export class KanbanService {
  constructor(private kanbanDao: KanbanDao, private logger: LoggerService) {}

  async fetchKanban(id: string): Promise<Kanban | void> {
    return this.kanbanDao.fetchKanban(id).catch((e) => {
      this.logger.handleGraphqlErrors(e);
    });
  }
}
