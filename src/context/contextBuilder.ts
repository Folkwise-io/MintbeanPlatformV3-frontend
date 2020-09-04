import { UserDao } from "daos/UserDao";
import { UserDaoImpl } from "daos/UserDaoImpl";
import { UserService } from "services/userService";

import { AuthDao } from "daos/AuthDao";
import { AuthDaoImpl } from "daos/AuthDaoImpl";
import { AuthService } from "services/authService";

import { ApiQueryExecutor } from "../api/ApiQueryExecutor";

export interface Context {
  apiQueryExecutor?: ApiQueryExecutor;
  userDao: UserDao;
  userService: UserService;
  authDao: AuthDao;
  authService: AuthService;
}

export const contextBuilder = (): Context => {
  const apiQueryExecutor = new ApiQueryExecutor();
  const userDao = new UserDaoImpl(apiQueryExecutor);
  const userService = new UserService(userDao);
  const authDao = new AuthDaoImpl(apiQueryExecutor);
  const authService = new AuthService(authDao);

  return {
    apiQueryExecutor,
    userDao,
    userService,
    authDao,
    authService,
  };
};
