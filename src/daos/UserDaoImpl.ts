import { ApiQueryExecutor } from "api/ApiQueryExecutor";
import { UserDao } from "./UserDao";

interface UsersResponseRaw {
  users: User[];
}

export class UserDaoImpl implements UserDao {
  constructor(private api: ApiQueryExecutor) {}

  fetchUsers(): Promise<User[]> {
    return this.api
      .query<UsersResponseRaw>(
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
      .then((result) => result.users || []);
  }
}
