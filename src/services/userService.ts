import { User } from "../../types";
import { UserDao } from "../daos/UserDao";

export class UserService {
  constructor(private userDao: UserDao) {}

  fetchUsers(): Promise<User[]> {
    return this.userDao.fetchUsers();
  }
}
