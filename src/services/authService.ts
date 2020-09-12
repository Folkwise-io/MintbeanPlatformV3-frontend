import { AuthDao } from "daos/AuthDao";
import { LoggerService } from "./loggerService";

export class AuthService {
  constructor(private authDao: AuthDao, private logger: LoggerService) {}

  login(loginInput: LoginInput): Promise<User | void> {
    return this.authDao.login(loginInput);
  }
}
