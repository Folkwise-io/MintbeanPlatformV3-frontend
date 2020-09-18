import { MeetDao } from "../../../src/daos/MeetDao";
import { meetFactory } from "../factories/meet.factory";

type SuccessDataTypes = Meet[] | Meet;

export class TestMeetDao implements MeetDao {
  data: Meet[];
  private mockReturns: ApiResponseRaw<SuccessDataTypes | null>[];

  constructor() {
    this.data = meetFactory.bulk(10);
    this.mockReturns = [];
  }

  async fetchMeets(): Promise<Meet[]> {
    if (this.getErrors().length) throw this.getErrors();
    return this.data;
  }
  async createMeet(params: CreateMeetParams): Promise<Meet> {
    if (this.getErrors().length) throw this.getErrors();
    if (params && this.getSuccesses().length) {
      return (this.getSuccesses()[0].data as unknown) as Meet;
    } else {
      throw { message: "This shouldn't happen", extensions: { code: "UNEXPECTED" } } as ServerError;
    }
  }

  mockReturn(mr: ApiResponseRaw<SuccessDataTypes | null>) {
    this.mockReturns.push(mr);
  }

  getErrors = () => {
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
