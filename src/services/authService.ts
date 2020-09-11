import { AuthDao } from "daos/AuthDao";

export class AuthService {
  constructor(private authDao: AuthDao) {}

  login(loginInput: LoginInput): Promise<User | undefined | void> {
    return this.authDao.login(loginInput);
  }
}
