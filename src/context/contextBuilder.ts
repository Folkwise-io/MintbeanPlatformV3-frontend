import { UserDao } from "../daos/UserDao";
import { UserDaoImpl } from "../daos/UserDaoImpl";
import { UserService } from "../services/userService";

import { AuthDao } from "../daos/AuthDao";
import { AuthDaoImpl } from "../daos/AuthDaoImpl";
import { AuthService } from "../services/authService";

import { MeetDao } from "../daos/MeetDao";
import { MeetDaoImpl } from "../daos/MeetDaoImpl";
import { MeetService } from "../services/meetService";

import { ApiQueryExecutor } from "../api/ApiQueryExecutor";
import { LoggerService } from "../services/loggerService";

export interface Context {
  apiQueryExecutor?: ApiQueryExecutor;
  userDao: UserDao;
  meetDao: MeetDao;
  userService: UserService;
  authDao: AuthDao;
  authService: AuthService;
  meetService: MeetService;
  loggerService: LoggerService;
}

export const contextBuilder = (): Context => {
  const loggerService = new LoggerService();
  const apiQueryExecutor = new ApiQueryExecutor();
  const userDao = new UserDaoImpl(apiQueryExecutor, loggerService);
  const meetDao = new MeetDaoImpl(apiQueryExecutor, loggerService);
  const userService = new UserService(userDao, loggerService);
  const authDao = new AuthDaoImpl(apiQueryExecutor, loggerService);
  const authService = new AuthService(authDao, loggerService);
  const meetService = new MeetService(meetDao, loggerService);

  return {
    apiQueryExecutor,
    userDao,
    meetDao,
    userService,
    authDao,
    authService,
    meetService,
    loggerService,
  };
};
