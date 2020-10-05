import { ApiQueryExecutor } from "../api/ApiQueryExecutor";
import { UserDao } from "./UserDao";
import { isServerErrorArray } from "../utils/typeGuards";
import { handleServerError } from "../utils/handleServerError";

interface UsersResponseRaw {
  users: User[];
}

export class UserDaoImpl implements UserDao {
  constructor(private api: ApiQueryExecutor) {}

  fetchUsers(): Promise<User[]> {
    return this.api
      .query<ApiResponseRaw<UsersResponseRaw>>(
        `
          query allUsers {
            users {
              id
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
      .catch(handleServerError);
  }
}
