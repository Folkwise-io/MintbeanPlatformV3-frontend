import { AuthDaoImpl } from "daos/AuthDaoImpl";

export class AuthService {
  constructor(private authDao: AuthDaoImpl) {}

  login(credentials: LoginInput): Promise<User> {
    return this.authDao.login(credentials);
  }
}
