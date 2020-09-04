import { UserDao } from "daos/UserDao";

export class TestUserDao implements UserDao {
  data: any;
  constructor() {
    this.data = null;
  }
  // new TestManager().addUsers({}, {}, {}).query()
  // constructor(private fakeData: any) {

  // }
  async fetchUsers(): Promise<any> {
    return this.data;
  }
}
