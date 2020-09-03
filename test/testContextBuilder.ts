import { Context } from "../src/context/contextBuilder";
import { ApiQueryExecutor } from "../src/api/ApiQueryExecutor";
import { UserService } from "../src/services/userService";
import { TestUserDao } from "./src/TestUserDao";

export const testContextBuilder = (): Context => {
  const userDao = new TestUserDao();
  const userService = new UserService(userDao);

  return {
    apiQueryExecutor: new ApiQueryExecutor(),
    userDao,
    userService,
  };
};
