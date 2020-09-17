import { MeetDao } from "../../../src/daos/MeetDao";
import { meetFactory } from "../factories/meet.factory";

type SuccessDataTypes = HackMeet[];

export class TestMeetDao implements MeetDao {
  data: HackMeet[];
  private mockReturns: ApiResponseRaw<SuccessDataTypes | null>[];

  constructor() {
    this.data = meetFactory.bulk(10);
    this.mockReturns = [];
  }

  async fetchMeets(): Promise<HackMeet[]> {
    return this.data;
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
