import { LoginParams, User, RegisterParams } from "../../types";
import { AuthDao } from "../daos/AuthDao";

export class AuthService {
  constructor(private authDao: AuthDao) {}

  login(params: LoginParams): Promise<User> {
    return this.authDao.login(params);
  }
  logout(): Promise<boolean> {
    return this.authDao.logout();
  }
  me(): Promise<User> {
    return this.authDao.me();
  }
  register(params: RegisterParams): Promise<User> {
    return this.authDao.register(params);
  }
}
