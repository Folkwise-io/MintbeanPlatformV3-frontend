import { User } from "../../types";

export interface UserDao {
  fetchUsers(): Promise<User[]>;
}
