import { ApiQueryExecutor } from "api/ApiQueryExecutor";
import { UserDao } from "./UserDao";
import { LoggerService } from "services/loggerService";

interface UsersResponseRaw {
  users: User[];
}

export class UserDaoImpl implements UserDao {
  // must keep loggerService for initialization
  constructor(private api: ApiQueryExecutor, private logger: LoggerService) {}

  fetchUsers(): Promise<User[] | void> {
    return (
      this.api
        .query<ApiResponseRaw<UsersResponseRaw>>(
          `
          query allUsers {
            users {
              id
              username
              firstName
              lastName
              createdAt
            }
          }
        `,
        )
        .then((result) => {
          if (result.errors) throw result.errors;
          if (!result.errors && !result.data.users) {
            throw [{ message: "Failed to get users", extensions: { code: "UNEXPECTED" } }];
          }
          return result.data.users;
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
