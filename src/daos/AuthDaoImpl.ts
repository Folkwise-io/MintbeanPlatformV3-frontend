// TODO: use correct mutation once backend structure known
import { ApiQueryExecutor } from "api/ApiQueryExecutor";
import { AuthDao } from "./AuthDao";
import { LoggerService } from "services/loggerService";

interface LoginResponseRaw {
  login: User;
}

export class AuthDaoImpl implements AuthDao {
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
          if (result.errors) {
            this.logger.handleGraphqlErrors(result.errors);
          }
          if (!result.data.login) {
            this.logger.danger("Failed to log in.");
          }

          return result.data.login;
        })
        // TODO: e will not always be a JS Error, it could be any thrown thing.
        // but logger.danger() expects it to be an error.
        // This could cause issues.
        .catch((e) => this.logger.danger("An unexpected error occurred", e))
    );
  }
}
