import { User } from "../types/User";
import { gqlApiService } from "./utils";

interface UsersResponseRaw {
  users: User[];
}

const fetchUsers = (): Promise<User[]> => {
  const query = `
    query allUsers {
      users {
        id
        username
        firstName
        lastName
        createdAt
      }
    }
  `;
  return gqlApiService<UsersResponseRaw>("http://localhost:4000/graphql", query).then((result) => {
    if (!result.users) {
      return [];
    }
    return result.users;
  });
};

export { fetchUsers };
