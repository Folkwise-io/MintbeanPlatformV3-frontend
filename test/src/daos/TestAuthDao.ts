import { AuthDao } from "../../../src/daos/AuthDao";
import { TestDao } from "../../testTypes";
/* eslint-disable  @typescript-eslint/no-explicit-any */

// any potential responses from TestAuthDao, besides null (error case)
type TestAuthDaoResponseTypes = User;

export class TestAuthDao implements AuthDao, TestDao {
  data: any;
  private mockReturns: ApiResponseRaw<TestAuthDaoResponseTypes | null>[];

  constructor() {
    this.data = null;
    this.mockReturns = [];
  }

  async login(loginInput: LoginInput): Promise<User> {
    const errorReturns = this.getErrors();
    const successReturns = this.getSuccesses();
    if (errorReturns.length) {
      // Mock failed login
      throw errorReturns;
    } else if (loginInput && successReturns.length) {
      // Mock successful login
      // *Login creds must be first mockedReturn
      return (successReturns[0].data as unknown) as User;
    } else {
      throw { message: "This shouldn't happen", extensions: { code: "UNEXPECTED" } } as ServerError;
    }
  }

  mockReturn(mr: ApiResponseRaw<TestAuthDaoResponseTypes | null>) {
    this.mockReturns.push(mr);
  }

  private getErrors = () => {
    return this.mockReturns.filter(
      (mr: ApiResponseRaw<TestAuthDaoResponseTypes | null>) => (mr.errors as unknown) as ApiResponseRaw<null>,
    );
  };

  private getSuccesses = () => {
    return this.mockReturns.filter(
      (mr: ApiResponseRaw<TestAuthDaoResponseTypes | null>) =>
        (mr.data as unknown) as ApiResponseRaw<TestAuthDaoResponseTypes>,
    );
  };

  clearMockReturns() {
    this.mockReturns = [];
  }
}
/* eslint-enable  @typescript-eslint/no-explicit-any */
