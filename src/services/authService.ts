import { AuthDao } from "../daos/AuthDao";

export class AuthService {
  constructor(private authDao: AuthDao) {}

  login(params: LoginInput): Promise<User> {
    return this.authDao.login(params);
  }
  logout(): Promise<boolean> {
    return this.authDao.logout();
  }
  me(): Promise<User> {
    return this.authDao.me();
  }
  register(params: RegisterInput): Promise<User> {
    return this.authDao.register(params);
  }
}
