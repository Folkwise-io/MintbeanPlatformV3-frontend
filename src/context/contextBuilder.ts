import { UserDaoImpl } from "../daos/UserDaoImpl";
import { UserService } from "../services/userService";
import { MeetService } from "../services/meetService";
import { ApiQueryExecutor } from "../api/ApiQueryExecutor";
import { MeetDaoImpl } from "../daos/MeetDaoImpl";
import { MeetDao } from "../daos/MeetDao";
import { UserDao } from "../daos/UserDao";

export interface Context {
  apiQueryExecutor?: ApiQueryExecutor;
  userDao: UserDao;
  meetDao: MeetDao;
  userService: UserService;
  meetService: MeetService;
}

export const contextBuilder = (): Context => {
  const apiQueryExecutor = new ApiQueryExecutor();
  const userDao = new UserDaoImpl(apiQueryExecutor);
  const meetDao = new MeetDaoImpl(apiQueryExecutor);
  const userService = new UserService(userDao);
  const meetService = new MeetService(meetDao);

  return {
    apiQueryExecutor,
    userDao,
    meetDao,
    userService,
    meetService,
  };
};
