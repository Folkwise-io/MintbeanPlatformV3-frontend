import { ApiQueryExecutor } from "../src/api/ApiQueryExecutor";
import { UserService } from "../src/services/userService";
import { TestUserDao } from "./src/daos/TestUserDao";
import { TestAuthDao } from "./src/daos/TestAuthDao";
import { MeetService } from "../src/services/meetService";
import { TestMeetDao } from "./src/daos/TestMeetDao";
import { ProjectService } from "../src/services/projectService";
import { TestProjectDao } from "./src/daos/TestProjectDao";
import { KanbanCanonService } from "../src/services/kanbanCanonService";
import { TestKanbanCanonDao } from "./src/daos/TestKanbanCanonDao";
import { Context } from "../src/context/contextBuilder";
import { LoggerService } from "../src/services/loggerService";
import { KanbanService } from "../src/services/kanbanService";
import { TestKanbanDao } from "./src/daos/TestKanbanDao";

export interface TestContext extends Context {
  apiQueryExecutor?: ApiQueryExecutor;
  userDao: TestUserDao;
  userService: UserService;
  meetDao: TestMeetDao;
  meetService: MeetService;
  authDao: TestAuthDao;
  projectDao: TestProjectDao;
  projectService: ProjectService;
  kanbanCanonDao: TestKanbanCanonDao;
  kanbanCanonService: KanbanCanonService;
  kanbanDao: TestKanbanDao;
  kanbanService: KanbanService;
}

export const testContextBuilder = (): TestContext => {
  const loggerService = new LoggerService();
  const userDao = new TestUserDao();
  const userService = new UserService(userDao);
  const meetDao = new TestMeetDao();
  const meetService = new MeetService(meetDao, loggerService);
  const authDao = new TestAuthDao();
  const projectDao = new TestProjectDao();
  const projectService = new ProjectService(projectDao, loggerService);
  const kanbanCanonDao = new TestKanbanCanonDao();
  const kanbanCanonService = new KanbanCanonService(kanbanCanonDao, loggerService);
  const kanbanDao = new TestKanbanDao();
  const kanbanService = new KanbanService(kanbanDao, loggerService);

  return {
    loggerService,
    apiQueryExecutor: new ApiQueryExecutor(),
    userDao,
    userService,
    meetDao,
    meetService,
    authDao,
    projectDao,
    projectService,
    kanbanCanonDao,
    kanbanCanonService,
    kanbanDao,
    kanbanService,
  };
};
