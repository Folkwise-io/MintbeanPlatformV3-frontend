import { fetchUsers as fetchUsersDao } from "../daos/UserDao";
import { User } from "../types/User";

export const fetchUsers = (): Promise<User[]> => {
  return fetchUsersDao();
};
