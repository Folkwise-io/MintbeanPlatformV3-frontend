// TODO: use correct mutation once backend structure known
import { ApiQueryExecutor } from "api/ApiQueryExecutor";
import { AuthDao } from "./AuthDao";

interface LoginResponseRaw {
  login: User;
}

export class AuthDaoImpl implements AuthDao {
  constructor(private api: ApiQueryExecutor) {}

  login(loginInput: LoginInput): Promise<User | void> {
    return this.api
      .query<ApiResponseRaw<LoginResponseRaw>, LoginInput>(
        `
            mutation Login($email: String!, $password: String!) {
              login(email: $email, password: $password) {
                id
                email
                username
                firstName
                lastName
                createdAt
              }
            }
          `,
        loginInput,
      )
      .then((result) => {
        if (result.errors || !result.data.login) throw result.errors;
        return result.data.login || undefined;
      })
      .catch((e) => console.log({ error: e }));
  }
}
