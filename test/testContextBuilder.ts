import { Context } from "../src/context/contextBuilder";
import { ApiQueryExecutor } from "../src/api/ApiQueryExecutor";
import { UserDao } from "../src/daos/UserDao";
import { UserService } from "../src/services/userService";

export const testContextBuilder = (): Context => {
  const apiQueryExecutor = new ApiQueryExecutor();
  const userDao = new UserDao(apiQueryExecutor);
  const userService = new UserService(userDao);

  return {
    apiQueryExecutor: new ApiQueryExecutor(),
    userDao,
    userService,
  };
};
