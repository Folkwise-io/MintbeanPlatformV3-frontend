import { LoggerService } from "./loggerService";
type AnyFunction<T> = () => T;

export class EntityService {
  logger: LoggerService;
  constructor(logger: LoggerService) {
    this.logger = logger;
  }

  async handleService<R>(callback: AnyFunction<Promise<R>>): Promise<R | void> {
    return callback().catch((e) => this.logger.handleGraphqlErrors(e));
  }
}
