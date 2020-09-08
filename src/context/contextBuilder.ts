import { UserDaoImpl } from "../daos/UserDaoImpl";
import { UserService } from "../services/userService";
import { EventService } from "../services/eventService";
import { ApiQueryExecutor } from "../api/ApiQueryExecutor";
import { UserDao } from "daos/UserDao";
import { EventDao } from "daos/EventDao";
import { EventDaoImpl } from "../daos/EventDaoImpl";

export interface Context {
  apiQueryExecutor?: ApiQueryExecutor;
  userDao: UserDao;
  eventDao: EventDao;
  userService: UserService;
  eventService: EventService;
}

export const contextBuilder = (): Context => {
  const apiQueryExecutor = new ApiQueryExecutor();
  const userDao = new UserDaoImpl(apiQueryExecutor);
  const eventDao = new EventDaoImpl(apiQueryExecutor);
  const userService = new UserService(userDao);
  const eventService = new EventService(eventDao);

  return {
    apiQueryExecutor,
    userDao,
    eventDao,
    userService,
    eventService,
  };
};
