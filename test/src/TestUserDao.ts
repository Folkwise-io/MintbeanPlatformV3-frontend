import { UserDao } from "daos/UserDao";

export class TestUserDao implements UserDao {
  async fetchUsers(): Promise<User[]> {
    return [
      {
        createdAt: new Date(),
        firstName: "test",
        lastName: "user",
        id: "userid",
        username: "testuser",
      },
    ];
  }
}
