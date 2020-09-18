import { AuthDao } from "../../../src/daos/AuthDao";
import { TestDao } from "../../testTypes";
/* eslint-disable  @typescript-eslint/no-explicit-any */

// any potential responses from this test dao, besides null (error case)
type SuccessDataTypes = User | boolean;

/*TODO refactor mockReturn handling in TestDao methods once pattern is understood */
export class TestAuthDao implements AuthDao, TestDao {
  data: any;
  private mockReturns: ApiResponseRaw<SuccessDataTypes | null>[];

  constructor() {
    this.data = null;
    this.mockReturns = [];
  }

  async login(loginInput: LoginParams): Promise<User> {
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

  async logout(): Promise<boolean> {
    // TODO: code this
    return true;
  }

  async me(): Promise<User> {
    const errorReturns = this.getErrors();
    const successReturns = this.getSuccesses();
    if (errorReturns.length) {
      // Mock failed login
      throw errorReturns;
    } else if (successReturns.length) {
      // Mock successful login
      return (successReturns[0].data as unknown) as User;
    } else {
      throw { message: "This shouldn't happen", extensions: { code: "UNEXPECTED" } } as ServerError;
    }
  }

  async register(params: RegisterParams): Promise<User> {
    const errorReturns = this.getErrors();
    const successReturns = this.getSuccesses();
    if (errorReturns.length) {
      // Mock fail
      throw errorReturns;
    } else if (params && successReturns.length) {
      // Mock success
      return (successReturns[0].data as unknown) as User;
    } else {
      throw { message: "This shouldn't happen", extensions: { code: "UNEXPECTED" } } as ServerError;
    }
  }

  mockReturn(mr: ApiResponseRaw<SuccessDataTypes | null>) {
    this.mockReturns.push(mr);
  }

  private getErrors = () => {
    return this.mockReturns.filter(
      (mr: ApiResponseRaw<SuccessDataTypes | null>) => (mr.errors as unknown) as ApiResponseRaw<null>,
    );
  };

  private getSuccesses = () => {
    return this.mockReturns.filter(
      (mr: ApiResponseRaw<SuccessDataTypes | null>) => (mr.data as unknown) as ApiResponseRaw<SuccessDataTypes>,
    );
  };

  clearMockReturns() {
    this.mockReturns = [];
  }
}
/* eslint-enable  @typescript-eslint/no-explicit-any */
