import { ApiQueryExecutor } from "../src/api/ApiQueryExecutor";
import { UserService } from "../src/services/userService";
import { MeetService } from "../src/services/meetService";
import { TestUserDao } from "./src/TestUserDao";
import { TestMeetDao } from "./src/TestMeetDao";

export interface TestContext {
  apiQueryExecutor?: ApiQueryExecutor;
  userDao: TestUserDao;
  eventDao: TestMeetDao;
  userService: UserService;
  meetService: MeetService;
}

export const testContextBuilder = (): TestContext => {
  const userDao = new TestUserDao();
  const eventDao = new TestMeetDao();
  const userService = new UserService(userDao);
  const meetService = new MeetService(eventDao);

  return {
    apiQueryExecutor: new ApiQueryExecutor(),
    meetService,
    userDao,
    eventDao,
    userService,
  };
};
