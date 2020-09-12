import { UserDao } from "daos/UserDao";

export class UserService {
  constructor(private userDao: UserDao) {}

  fetchUsers(): Promise<User[] | void> {
    return this.userDao.fetchUsers();
  }
}
