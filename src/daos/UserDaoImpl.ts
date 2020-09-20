import { ApiQueryExecutor } from "../api/ApiQueryExecutor";
import { UserDao } from "./UserDao";
import { isServerErrorArray } from "../utils/typeGuards";

interface UsersResponseRaw {
  users: User[];
}

export class UserDaoImpl implements UserDao {
  constructor(private api: ApiQueryExecutor) {}

  fetchUsers(): Promise<User[]> {
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
        // TODO: What potential Types of errors can invoke this catch?
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        .catch((e: any) => {
          if (isServerErrorArray(e)) throw e;
          throw [{ message: e.message, extensions: { code: "UNEXPECTED" } }];
        })
      /* eslint-enable  @typescript-eslint/no-explicit-any */
    );
  }
}
