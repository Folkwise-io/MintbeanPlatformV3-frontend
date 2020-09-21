import { ApiQueryExecutor } from "../src/api/ApiQueryExecutor";
import { UserService } from "../src/services/userService";
import { TestUserDao } from "./src/daos/TestUserDao";
import { AuthService } from "../src/services/authService";
import { TestAuthDao } from "./src/daos/TestAuthDao";
import { MeetService } from "../src/services/meetService";
import { TestMeetDao } from "./src/daos/TestMeetDao";
import { ProjectService } from "./src/services/projectService";
import { TestProjectDao } from "./src/daos/TestProjectDao";
import { Context } from "../src/context/contextBuilder";
import { LoggerService } from "../src/services/loggerService";

export interface TestContext extends Context {
  apiQueryExecutor?: ApiQueryExecutor;
  userDao: TestUserDao;
  userService: UserService;
  meetDao: TestMeetDao;
  meetService: MeetService;
  authDao: TestAuthDao;
  authService: AuthService;
  projectDao: TestProjectDao;
  projectService: ProjectService;
}

export const testContextBuilder = (): TestContext => {
  const loggerService = new LoggerService();
  const userDao = new TestUserDao();
  const userService = new UserService(userDao);
  const meetDao = new TestMeetDao();
  const meetService = new MeetService(meetDao, loggerService);
  const authDao = new TestAuthDao();
  const authService = new AuthService(authDao);
  const projectDao = new TestProjectDao();
  const projectService = new ProjectService(projectDao);

  return {
    loggerService,
    apiQueryExecutor: new ApiQueryExecutor(),
    userDao,
    userService,
    meetDao,
    meetService,
    authDao,
    authService,
    projectDao,
    projectService,
  };
};
