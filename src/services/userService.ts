import { UserDao } from "daos/UserDao";
import { LoggerService } from "./loggerService";

export class UserService {
  constructor(private userDao: UserDao, private logger: LoggerService) {}

  fetchUsers(): Promise<User[] | void> {
    return this.userDao.fetchUsers();
  }
}
