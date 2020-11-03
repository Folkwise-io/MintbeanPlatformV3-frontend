import { UserDao } from "../daos/UserDao";
import { UserDaoImpl } from "../daos/UserDaoImpl";
import { UserService } from "../services/userService";

import { AuthDao } from "../daos/AuthDao";
import { AuthDaoImpl } from "../daos/AuthDaoImpl";
import { AuthService } from "../services/authService";

import { MeetDao } from "../daos/MeetDao";
import { MeetDaoImpl } from "../daos/MeetDaoImpl";
import { MeetService } from "../services/meetService";

import { BadgeDao } from "../daos/BadgeDao";
import { BadgeDaoImpl } from "../daos/BadgeDaoImpl";
import { BadgeService } from "../services/badgeService";

import { ProjectDao } from "../daos/ProjectDao";
import { ProjectDaoImpl } from "../daos/ProjectDaoImpl";
import { ProjectService } from "../services/projectService";

import { KanbanDao } from "../daos/KanbanDao";
import { KanbanDaoImplFake } from "../daos/KanbanDaoImplFake";
import { KanbanService } from "../services/kanbanService";

import { ApiQueryExecutor } from "../api/ApiQueryExecutor";
import { LoggerService } from "../services/loggerService";

export interface Context {
  apiQueryExecutor?: ApiQueryExecutor;
  userDao: UserDao;
  authDao: AuthDao;
  meetDao: MeetDao;
  badgeDao: BadgeDao;
  projectDao: ProjectDao;
  kanbanDao: KanbanDao;
  userService: UserService;
  authService: AuthService;
  meetService: MeetService;
  badgeService: BadgeService;
  projectService: ProjectService;
  kanbanService: KanbanService;
  loggerService: LoggerService;
}

export const contextBuilder = (): Context => {
  const loggerService = new LoggerService();
  const apiQueryExecutor = new ApiQueryExecutor();
  const userDao = new UserDaoImpl(apiQueryExecutor);
  const meetDao = new MeetDaoImpl(apiQueryExecutor);
  const badgeDao = new BadgeDaoImpl(apiQueryExecutor);
  const projectDao = new ProjectDaoImpl(apiQueryExecutor);
  // TODO: reinstate real KanbanDaoImpl once hooked to backend. Remove KanbanDaoImplFake reference
  // const kanbanDao = new KanbanDaoImpl(apiQueryExecutor);
  const kanbanDao = new KanbanDaoImplFake();
  const userService = new UserService(userDao);
  const authDao = new AuthDaoImpl(apiQueryExecutor);
  const authService = new AuthService(authDao);
  const meetService = new MeetService(meetDao, loggerService);
  const badgeService = new BadgeService(badgeDao, loggerService);
  const projectService = new ProjectService(projectDao, loggerService);
  const kanbanService = new KanbanService(kanbanDao, loggerService);

  return {
    apiQueryExecutor,
    userDao,
    authDao,
    meetDao,
    badgeDao,
    projectDao,
    kanbanDao,
    userService,
    authService,
    meetService,
    badgeService,
    projectService,
    kanbanService,
    loggerService,
  };
};
