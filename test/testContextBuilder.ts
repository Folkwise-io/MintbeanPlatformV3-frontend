import { ApiQueryExecutor } from "../src/api/ApiQueryExecutor";
import { UserService } from "../src/services/userService";
import { EventService } from "../src/services/eventService";
import { TestUserDao } from "./src/TestUserDao";
import { TestEventDao } from "./src/TestEventDao";

export interface TestContext {
  apiQueryExecutor?: ApiQueryExecutor;
  userDao: TestUserDao;
  eventDao: TestEventDao;
  userService: UserService;
  eventService: EventService;
}

export const testContextBuilder = (): TestContext => {
  const userDao = new TestUserDao();
  const eventDao = new TestEventDao();
  const userService = new UserService(userDao);
  const eventService = new EventService(eventDao);

  return {
    apiQueryExecutor: new ApiQueryExecutor(),
    eventService,
    userDao,
    eventDao,
    userService,
  };
};
