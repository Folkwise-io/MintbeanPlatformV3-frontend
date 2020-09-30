import { UserDao } from "../daos/UserDao";
import { UserDaoImpl } from "../daos/UserDaoImpl";
import { UserService } from "../services/userService";

import { AuthDao } from "../daos/AuthDao";
import { AuthDaoImpl } from "../daos/AuthDaoImpl";
import { AuthService } from "../services/authService";

import { MeetDao } from "../daos/MeetDao";
import { MeetDaoImpl } from "../daos/MeetDaoImpl";
import { MeetService } from "../services/meetService";

import { ProjectDao } from "../daos/ProjectDao";
import { ProjectDaoImpl } from "../daos/ProjectDaoImpl";
import { ProjectService } from "../services/projectService";

import { ApiQueryExecutor } from "../api/ApiQueryExecutor";
import { LoggerService } from "../services/loggerService";

export interface Context {
  apiQueryExecutor?: ApiQueryExecutor;
  userDao: UserDao;
  authDao: AuthDao;
  meetDao: MeetDao;
  projectDao: ProjectDao;
  userService: UserService;
  authService: AuthService;
  meetService: MeetService;
  projectService: ProjectService;
  loggerService: LoggerService;
}

export const contextBuilder = (): Context => {
  const loggerService = new LoggerService();
  const apiQueryExecutor = new ApiQueryExecutor();
  const userDao = new UserDaoImpl(apiQueryExecutor);
  const meetDao = new MeetDaoImpl(apiQueryExecutor);
  const projectDao = new ProjectDaoImpl(apiQueryExecutor);
  const userService = new UserService(userDao);
  const authDao = new AuthDaoImpl(apiQueryExecutor);
  const authService = new AuthService(authDao);
  const meetService = new MeetService(meetDao, loggerService);
  const projectService = new ProjectService(projectDao, loggerService);

  return {
    apiQueryExecutor,
    userDao,
    authDao,
    meetDao,
    projectDao,
    userService,
    authService,
    meetService,
    projectService,
    loggerService,
  };
};
