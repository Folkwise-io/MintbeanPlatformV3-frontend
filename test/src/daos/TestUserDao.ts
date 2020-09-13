import { UserDao } from "../../../src/daos/UserDao";
import { TestDao } from "../../testTypes";

type TestUserDaoResponseTypes = User[];

export class TestUserDao implements UserDao, TestDao {
  data: User[];
  private mockReturns: ApiResponseRaw<TestUserDaoResponseTypes | null>[];

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
      (mr: ApiResponseRaw<TestUserDaoResponseTypes | null>) => (mr.errors as unknown) as ApiResponseRaw<null>,
    );
  };

  private getSuccesses = () => {
    return this.mockReturns.filter(
      (mr: ApiResponseRaw<TestUserDaoResponseTypes | null>) =>
        (mr.data as unknown) as ApiResponseRaw<TestUserDaoResponseTypes>,
    );
  };

  clearMockReturns() {
    this.mockReturns = [];
  }
}
