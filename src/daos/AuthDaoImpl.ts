// TODO: use correct mutation once backend structure known
import { ApiQueryExecutor } from "api/ApiQueryExecutor";
import { AuthDao } from "./AuthDao";

interface UserResponseRaw {
  user: User;
}

export class AuthDaoImpl implements AuthDao {
  constructor(private api: ApiQueryExecutor) {}

  login(loginInput: LoginInput): Promise<User | undefined | void> {
    console.log(loginInput);
    return this.api
      .query<UserResponseRaw, LoginInput>(
        `
            mutation Login {
              login(email: ${loginInput.email}, password: ${loginInput.password}) {
                id
                email
                username
                firstName
                lastName
                createdAt
              }
            }
          `,
      )
      .then((result) => result.user || undefined)
      .catch((e) => console.log({ error: e }));
  }
}
