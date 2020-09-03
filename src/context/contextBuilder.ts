import { UserDaoImpl } from "../daos/UserDaoImpl";
import { UserService } from "../services/userService";
import { ApiQueryExecutor } from "../api/ApiQueryExecutor";
import { UserDao } from "daos/UserDao";

export interface Context {
  apiQueryExecutor?: ApiQueryExecutor;
  userDao: UserDao;
  userService: UserService;
}

export const contextBuilder = (): Context => {
  const apiQueryExecutor = new ApiQueryExecutor();
  const userDao = new UserDaoImpl(apiQueryExecutor);
  const userService = new UserService(userDao);

  return {
    apiQueryExecutor,
    userDao,
    userService,
  };
};
