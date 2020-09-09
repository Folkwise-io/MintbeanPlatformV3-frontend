import { ApiQueryExecutor } from "../src/api/ApiQueryExecutor";
import { UserService } from "../src/services/userService";
import { AuthService } from "../src/services/authService";
import { TestUserDao } from "./src/TestUserDao";
import { TestAuthDao } from "./src/TestAuthDao";

export interface TestContext {
  apiQueryExecutor?: ApiQueryExecutor;
  userDao: TestUserDao;
  userService: UserService;
}

export const testContextBuilder = (): TestContext => {
  const userDao = new TestUserDao();
  const userService = new UserService(userDao);
  const authDao = new TestAuthDao();
  const authService = new AuthService(authDao);

  return {
    apiQueryExecutor: new ApiQueryExecutor(),
    userDao,
    userService,
    authDao,
    authService,
  };
};
