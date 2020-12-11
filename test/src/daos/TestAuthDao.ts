import { AuthDao } from "../../../src/daos/AuthDao";
import { UserForProfile } from "../../../src/types/user";
import { TestDao } from "../../testTypes";

// any potential responses from this test dao, besides null (error case)
type SuccessDataTypes = User | boolean;

/*TODO refactor mockReturn handling in TestDao methods once pattern is understood */
export class TestAuthDao implements AuthDao, TestDao {
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  data: any;
  private mockReturns: ApiResponseRaw<SuccessDataTypes | null>[];

  constructor() {
    this.data = null;
    this.mockReturns = [];
  }

  async login(LoginArgs: LoginArgs): Promise<User> {
    const errorReturns = this.getErrors();
    const successReturns = this.getSuccesses();
    if (errorReturns.length) {
      // Mock failed login
      throw errorReturns;
    } else if (LoginArgs && successReturns.length) {
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

  async me(): Promise<UserForProfile> {
    const errorReturns = this.getErrors();
    const successReturns = this.getSuccesses();
    if (errorReturns.length) {
      // Mock failed login
      throw errorReturns;
    } else if (successReturns.length) {
      // Mock successful login
      return (successReturns[0].data as unknown) as UserForProfile;
    } else {
      throw { message: "This shouldn't happen", extensions: { code: "UNEXPECTED" } } as ServerError;
    }
  }

  async register(params: RegisterInput): Promise<User> {
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

  async editUser(id: string, input: EditUserInput): Promise<User> {
    const errorReturns = this.getErrors();
    const successReturns = this.getSuccesses();
    if (!id || !input) throw "You messed up in writing your test. Make sure id and input params are passed as args";
    if (errorReturns.length) throw errorReturns;

    if (id && input && successReturns.length) {
      return (successReturns[0].data as unknown) as User;
    } else {
      const index: number = this.data.findIndex((user: User) => user.id === id);
      const prevUser: User = this.data[index];
      return (this.data[index] = { ...prevUser, ...input });
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
