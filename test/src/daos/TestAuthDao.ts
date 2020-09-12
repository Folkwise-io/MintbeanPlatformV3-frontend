import { AuthDao } from "daos/AuthDao";
import { TestDao } from "../../testTypes";

export class TestAuthDao implements AuthDao, TestDao {
  data: any;
  private mockReturns: any[];

  constructor() {
    this.data = null;
    this.mockReturns = [];
  }

  async login(loginInput: LoginInput): Promise<User> {
    const errorResponses = this.mockReturns.filter((mr) => mr.errors);
    if (errorResponses.length) {
      throw errorResponses;
    } else if (loginInput && this.mockReturns.length) {
      return this.mockReturns.shift()[0].data;
    } else {
      throw new Error("Login failed");
    }
  }

  mockReturn(arr: any[]) {
    this.mockReturns.push(arr);
  }

  clearMockReturns() {
    this.mockReturns = [];
  }
}
