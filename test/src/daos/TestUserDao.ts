import { UserDao } from "daos/UserDao";
import { TestDao } from "../../testTypes";

export class TestUserDao implements UserDao, TestDao {
  data: User[];
  private mockReturns: any[];

  constructor() {
    this.data = [];
    this.mockReturns = [];
  }

  async fetchUsers(): Promise<User[]> {
    if (this.mockReturns.length) {
      return this.mockReturns.shift();
    } else {
      return this.data;
    }
  }

  mockReturn(arr: any[]) {
    this.mockReturns.push(arr);
  }

  clearMockReturns() {
    this.mockReturns = [];
  }
}
