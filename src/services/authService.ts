import { AuthDao } from "daos/AuthDao";

export class AuthService {
  constructor(private authDao: AuthDao) {}

  login(loginInput: LoginInput): Promise<User> {
    return this.authDao.login(loginInput);
  }
  logout(): Promise<boolean | void> {
    // Return ambiguous error to user for auth failures
    return this.authDao.logout().catch((e: ServerError) => this.logger.handleGraphqlErrors(e));
  }
}
