export interface UserDao {
  fetchUsers(): Promise<User[] | void>;
}
