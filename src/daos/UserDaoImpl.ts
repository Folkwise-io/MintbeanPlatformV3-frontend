import { ApiQueryExecutor } from "api/ApiQueryExecutor";
import { UserDao } from "./UserDao";
import { LoggerService } from "services/loggerService";

interface UsersResponseRaw {
  users: User[];
}

export class UserDaoImpl implements UserDao {
  constructor(private api: ApiQueryExecutor, private logger: LoggerService) {}

  fetchUsers(): Promise<User[] | void> {
    return this.api
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
        if (result.errors || !result.data.users) throw result.errors;
        return result.data.users;
      });
  }
}
