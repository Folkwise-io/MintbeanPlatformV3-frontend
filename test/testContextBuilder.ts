import { ApiQueryExecutor } from "../src/api/ApiQueryExecutor";
import { UserService } from "../src/services/userService";
import { TestUserDao } from "./src/TestUserDao";
import { TestEventDao } from "./src/TestEventDao";

export interface TestContext {
  apiQueryExecutor?: ApiQueryExecutor;
  userDao: TestUserDao;
  eventDao: TestEventDao;
  userService: UserService;
}

export const testContextBuilder = (): TestContext => {
  const userDao = new TestUserDao();
  const eventDao = new TestEventDao();
  const userService = new UserService(userDao);

  return {
    apiQueryExecutor: new ApiQueryExecutor(),
    userDao,
    eventDao,
    userService,
  };
};
