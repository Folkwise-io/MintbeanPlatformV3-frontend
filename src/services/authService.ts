import { AuthDao } from "../daos/AuthDao";

export class AuthService {
  constructor(private authDao: AuthDao) {}

  login(loginInput: LoginInput): Promise<User> {
    return this.authDao.login(loginInput);
  }
  logout(): Promise<boolean> {
    return this.authDao.logout();
  }
  me(): Promise<User> {
    return this.authDao.me();
  }
}
