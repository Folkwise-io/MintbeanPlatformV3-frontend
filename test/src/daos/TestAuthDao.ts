import { AuthDao } from "daos/AuthDao";
import { TestDao } from "../../testTypes";

export class TestAuthDao implements AuthDao, TestDao {
  data: any;
  private mockReturns: any[];

  constructor() {
    this.data = null;
    this.mockReturns = [];
  }

  async login(loginInput: LoginInput): Promise<User | undefined> {
    if (loginInput && this.mockReturns.length) {
      return this.mockReturns.shift()[0];
    } else {
      return undefined;
    }
  }

  mockReturn(arr: any[]) {
    this.mockReturns.push(arr);
  }

  clearMockReturns() {
    this.mockReturns = [];
  }
}
