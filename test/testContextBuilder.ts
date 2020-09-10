import { ApiQueryExecutor } from "../src/api/ApiQueryExecutor";
import { UserService } from "../src/services/userService";
import { TestUserDao } from "./src/daos/TestUserDao";
import { AuthService } from "../src/services/authService";
import { TestAuthDao } from "./src/daos/TestAuthDao";
import { MeetService } from "../src/services/meetService";
import { TestMeetDao } from "./src/daos/TestMeetDao";
import { Context } from "../src/context/contextBuilder";

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
  const userDao = new TestUserDao();
  const meetDao = new TestMeetDao();
  const userService = new UserService(userDao);
  const authDao = new TestAuthDao();
  const authService = new AuthService(authDao);
  const meetService = new MeetService(meetDao);

  return {
    apiQueryExecutor: new ApiQueryExecutor(),
    meetService,
    userDao,
    meetDao,
    userService,
    authDao,
    authService,
  };
};
