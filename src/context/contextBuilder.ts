import { UserDao } from "../daos/UserDao";
import { UserDaoImpl } from "../daos/UserDaoImpl";
import { UserService } from "../services/userService";

import { AuthDao } from "../daos/AuthDao";
import { AuthDaoImpl } from "../daos/AuthDaoImpl";

import { MeetDao } from "../daos/MeetDao";
import { MeetDaoImpl } from "../daos/MeetDaoImpl";
import { MeetService } from "../services/meetService";

import { BadgeDao } from "../daos/BadgeDao";
import { BadgeDaoImpl } from "../daos/BadgeDaoImpl";
import { BadgeService } from "../services/badgeService";

import { ProjectDao } from "../daos/ProjectDao";
import { ProjectDaoImpl } from "../daos/ProjectDaoImpl";
import { ProjectService } from "../services/projectService";

import { KanbanCanonDao } from "../daos/KanbanCanonDao";
import { KanbanCanonDaoImpl } from "../daos/KanbanCanonDaoImpl";
import { KanbanCanonService } from "../services/kanbanCanonService";

import { KanbanDao } from "../daos/KanbanDao";
import { KanbanDaoImpl } from "../daos/KanbanDaoImpl";
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
  kanbanCanonDao: KanbanCanonDao;
  kanbanDao: KanbanDao;
  userService: UserService;
  meetService: MeetService;
  badgeService: BadgeService;
  projectService: ProjectService;
  kanbanCanonService: KanbanCanonService;
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
  const kanbanCanonDao = new KanbanCanonDaoImpl(apiQueryExecutor);
  const kanbanDao = new KanbanDaoImpl(apiQueryExecutor);
  const userService = new UserService(userDao);
  const authDao = new AuthDaoImpl(apiQueryExecutor);
  const meetService = new MeetService(meetDao, loggerService);
  const badgeService = new BadgeService(badgeDao, loggerService);
  const projectService = new ProjectService(projectDao, loggerService);
  const kanbanCanonService = new KanbanCanonService(kanbanCanonDao, loggerService);
  const kanbanService = new KanbanService(kanbanDao, loggerService);

  return {
    apiQueryExecutor,
    userDao,
    authDao,
    meetDao,
    badgeDao,
    projectDao,
    kanbanCanonDao,
    kanbanDao,
    userService,
    meetService,
    badgeService,
    projectService,
    kanbanCanonService,
    kanbanService,
    loggerService,
  };
};
