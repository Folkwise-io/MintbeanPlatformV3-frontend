import { UserDao } from "../../../src/daos/UserDao";
import { TestDao } from "../../testTypes";

// any potential responses from this test dao, besides null (error case)
type SuccessDataTypes = User[];

export class TestUserDao implements UserDao, TestDao {
  data: User[];
  private mockReturns: ApiResponseRaw<SuccessDataTypes | null>[];

  constructor() {
    this.data = [];
    this.mockReturns = [];
  }

  async fetchUsers(): Promise<User[]> {
    const errorReturns = this.getErrors();
    // const successReturns = this.getSuccesses()
    if (errorReturns.length) throw errorReturns;
    return this.data;
  }

  mockReturn(mr: ApiResponseRaw<User[] | null>) {
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
