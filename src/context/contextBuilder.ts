import { UserDao } from "daos/UserDao";
import { UserService } from "services/userService";
import { ApiQueryExecutor } from "api/ApiQueryExecutor";

export interface Context {
  apiQueryExecutor: ApiQueryExecutor;
  userDao: UserDao;
  userService: UserService;
}

export const contextBuilder = (): Context => {
  const apiQueryExecutor = new ApiQueryExecutor();
  const userDao = new UserDao(apiQueryExecutor);
  const userService = new UserService(userDao);

  return {
    apiQueryExecutor,
    userDao,
    userService,
  };
};
