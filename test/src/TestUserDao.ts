import { UserDao } from "daos/UserDao";

export class TestUserDao implements UserDao {
  // new TestManager().addUsers({}, {}, {}).query()
  // constructor(private fakeData: any) {

  // }
  async fetchUsers(): Promise<User[]> {
    // return this.fakeData.users;
    return [
      {
        createdAt: new Date("1994-08-02T18:59:50.006Z"),
        firstName: "test",
        lastName: "user",
        id: "userid",
        username: "testuser",
      },
    ];
  }
}
