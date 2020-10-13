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

import { KanbanDao } from "../daos/KanbanDao";
import { KanbanDaoImpl } from "../daos/KanbanDaoImpl";
import { KanbanDaoImplFake } from "../daos/KanbanDaoImplFake";
import { KanbanService } from "../services/kanbanService";

import { ApiQueryExecutor } from "../api/ApiQueryExecutor";
import { LoggerService } from "../services/loggerService";

export interface Context {
  apiQueryExecutor?: ApiQueryExecutor;
  userDao: UserDao;
  authDao: AuthDao;
  meetDao: MeetDao;
  projectDao: ProjectDao;
  kanbanDao: KanbanDao;
  userService: UserService;
  authService: AuthService;
  meetService: MeetService;
  projectService: ProjectService;
  kanbanService: KanbanService;
  loggerService: LoggerService;
}

export const contextBuilder = (): Context => {
  const loggerService = new LoggerService();
  const apiQueryExecutor = new ApiQueryExecutor();
  const userDao = new UserDaoImpl(apiQueryExecutor);
  const meetDao = new MeetDaoImpl(apiQueryExecutor);
  const projectDao = new ProjectDaoImpl(apiQueryExecutor);
  const kanbanDao = new KanbanDaoImpl(apiQueryExecutor);
  // const kanbanDao = new KanbanDaoImplFake();
  const userService = new UserService(userDao);
  const authDao = new AuthDaoImpl(apiQueryExecutor);
  const authService = new AuthService(authDao);
  const meetService = new MeetService(meetDao, loggerService);
  const projectService = new ProjectService(projectDao, loggerService);
  const kanbanService = new KanbanService(kanbanDao, loggerService);

  return {
    apiQueryExecutor,
    userDao,
    authDao,
    meetDao,
    projectDao,
    kanbanDao,
    userService,
    authService,
    meetService,
    projectService,
    kanbanService,
    loggerService,
  };
};
