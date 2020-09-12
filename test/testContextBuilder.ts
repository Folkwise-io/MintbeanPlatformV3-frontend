import { ApiQueryExecutor } from "../src/api/ApiQueryExecutor";
import { UserService } from "../src/services/userService";
import { TestUserDao } from "./src/daos/TestUserDao";
import { AuthService } from "../src/services/authService";
import { TestAuthDao } from "./src/daos/TestAuthDao";
import { MeetService } from "../src/services/meetService";
import { TestMeetDao } from "./src/daos/TestMeetDao";
import { Context } from "../src/context/contextBuilder";
import { LoggerService } from "../src/services/loggerService";

export interface TestContext extends Context {
  apiQueryExecutor?: ApiQueryExecutor;
  userDao: TestUserDao;
  meetDao: TestMeetDao;
  userService: UserService;
  meetService: MeetService;
  authDao: TestAuthDao;
  authService: AuthService;
}

export const testContextBuilder = (): TestContext => {
  const loggerService = new LoggerService();
  const userDao = new TestUserDao();
  const meetDao = new TestMeetDao();
  const userService = new UserService(userDao, loggerService);
  const authDao = new TestAuthDao();
  const authService = new AuthService(authDao, loggerService);
  const meetService = new MeetService(meetDao, loggerService);

  return {
    loggerService,
    apiQueryExecutor: new ApiQueryExecutor(),
    meetService,
    userDao,
    meetDao,
    userService,
    authDao,
    authService,
  };
};
