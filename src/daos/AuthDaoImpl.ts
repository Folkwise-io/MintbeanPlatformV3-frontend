// TODO: use correct mutation once backend structure known
import { ApiQueryExecutor } from "api/ApiQueryExecutor";
import { AuthDao } from "./AuthDao";

interface LoginResponseRaw {
  login: User;
}

export class AuthDaoImpl implements AuthDao {
  constructor(private api: ApiQueryExecutor) {}

  login(loginInput: LoginInput): Promise<User> {
    return (
      this.api
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
          if (result.errors) throw result.errors;
          if (!result.errors && !result.data.login) {
            throw [{ message: "Failed to log in", extensions: { code: "UNEXPECTED" } }];
          }
          return result.data.login;
        })
        // TODO: What potential Types of errors can invoke this catch?
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        .catch((e: any) => {
          if (e.errors) {
            throw e.errors;
          } else {
            throw [{ message: e.message, extensions: { code: "UNEXPECTED" } }];
          }
        })
      /* eslint-enable  @typescript-eslint/no-explicit-any */
    );
  }
}
