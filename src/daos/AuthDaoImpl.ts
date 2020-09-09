// TODO: use correct mutation once backend structure known
import { ApiQueryExecutor } from "api/ApiQueryExecutor";
import { AuthDao } from "./AuthDao";

interface UserResponseRaw {
  user: User;
}

export class AuthDaoImpl implements AuthDao {
  constructor(private api: ApiQueryExecutor) {}

  login(loginInput: LoginInput): Promise<User> {
    return this.api
      .query<UserResponseRaw, LoginInput>(
        `
          mutation Login {
            login(username: $username, password: $password) {
              id
              username
              firstName
              lastName
              createdAt
            }
          }
        `,
        loginInput,
      )
      .then((result) => result.user || undefined);
  }
}
