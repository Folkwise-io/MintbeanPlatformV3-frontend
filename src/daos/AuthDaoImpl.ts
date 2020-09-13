// TODO: use correct mutation once backend structure known
import { ApiQueryExecutor } from "api/ApiQueryExecutor";
import { AuthDao } from "./AuthDao";
import { LoggerService } from "services/loggerService";

interface LoginResponseRaw {
  login: User;
}
interface LogoutResponseRaw {
  logout: boolean;
}

export class AuthDaoImpl implements AuthDao {
  // must keep loggerService for initialization
  constructor(private api: ApiQueryExecutor, private logger: LoggerService) {}

  login(loginInput: LoginInput): Promise<User | void> {
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
        // TODO: Don't know what type[s] of errors could be thrown here.
        // For now builds standard errors based on error message or default
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        .catch((e: any) => {
          throw e;
        })
      /* eslint-enable  @typescript-eslint/no-explicit-any */
    );
  }

  logout(): Promise<boolean | void> {
    return (
      this.api
        .query<ApiResponseRaw<LogoutResponseRaw>, LoginInput>(
          `
            mutation logout {
              logout
            }
          `,
        )
        .then((result) => {
          if (result.errors) throw result.errors;
          if (!result.errors && !result.data.logout) {
            throw [{ message: "Failed to logout", extensions: { code: "UNEXPECTED" } }];
          }
          return result.data.logout;
        })
        // TODO: Don't know what type[s] of errors could be thrown here.
        // For now builds standard errors based on error message or default
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        .catch((e: any) => {
          throw e;
        })
      /* eslint-enable  @typescript-eslint/no-explicit-any */
    );
  }
}
