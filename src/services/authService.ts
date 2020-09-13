import { AuthDao } from "daos/AuthDao";
import { LoggerService } from "./loggerService";

export class AuthService {
  constructor(private authDao: AuthDao, private logger: LoggerService) {}

  login(loginInput: LoginInput): Promise<User | void> {
    // Return ambiguous error to user for auth failures
    return this.authDao.login(loginInput).catch(() => this.logger.handleGraphqlErrors([{ message: "Login failed." }]));
  }
  logout(): Promise<boolean | void> {
    // Return ambiguous error to user for auth failures
    return this.authDao.logout().catch((e: ServerError) => this.logger.handleGraphqlErrors(e));
  }
}
