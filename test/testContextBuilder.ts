import { ApiQueryExecutor } from "../src/api/ApiQueryExecutor";
import { UserService } from "../src/services/userService";
import { TestUserDao } from "./src/TestUserDao";

export interface TestContext {
  apiQueryExecutor?: ApiQueryExecutor;
  userDao: TestUserDao;
  userService: UserService;
}

export const testContextBuilder = (): TestContext => {
  const userDao = new TestUserDao();
  const userService = new UserService(userDao);

  return {
    apiQueryExecutor: new ApiQueryExecutor(),
    userDao,
    userService,
  };
};
