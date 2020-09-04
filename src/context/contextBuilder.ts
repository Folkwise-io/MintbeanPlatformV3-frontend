import { UserDaoImpl } from "../daos/UserDaoImpl";
import { UserService } from "../services/userService";
import { ApiQueryExecutor } from "../api/ApiQueryExecutor";
import { UserDao } from "daos/UserDao";
import { EventDao } from "daos/EventDao";
import { EventDaoImpl } from "daos/EventDaoImpl";

export interface Context {
  apiQueryExecutor?: ApiQueryExecutor;
  userDao: UserDao;
  eventDao: EventDao;
  userService: UserService;
}

export const contextBuilder = (): Context => {
  const apiQueryExecutor = new ApiQueryExecutor();
  const userDao = new UserDaoImpl(apiQueryExecutor);
  const eventDao = new EventDaoImpl(apiQueryExecutor);
  const userService = new UserService(userDao);

  return {
    apiQueryExecutor,
    userDao,
    eventDao,
    userService,
  };
};
