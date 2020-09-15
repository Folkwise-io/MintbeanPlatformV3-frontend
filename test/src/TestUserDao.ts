import { UserDao } from "../../src/daos/UserDao";

export class TestUserDao implements UserDao {
  data: User[];
  constructor() {
    this.data = [];
  }
  // new TestManager().addUsers({}, {}, {}).query()
  // constructor(private fakeData: any) {

  // }
  async fetchUsers(): Promise<User[]> {
    return this.data;
  }
}
