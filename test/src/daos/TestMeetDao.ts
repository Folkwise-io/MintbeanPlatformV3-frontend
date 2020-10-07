import { MeetDao } from "../../../src/daos/MeetDao";
import { meetFactory } from "../factories/meet.factory";

type SuccessDataTypes = Meet[] | Meet | boolean;

// TODO: implement cookie header mocking for authorization tests
export class TestMeetDao implements MeetDao {
  data: Meet[];
  private mockReturns: ApiResponseRaw<SuccessDataTypes | null>[];

  constructor() {
    // TODO: fix meet factory to allow recursive testing
    this.data = meetFactory.bulk();
    this.mockReturns = [];
  }

  async fetchMeets(): Promise<Meet[]> {
    if (this.getErrors().length) throw this.getErrors().map((er) => er.errors)[0];
    return this.data;
  }
  async fetchMeet(id: string): Promise<Meet> {
    if (!id)
      throw {
        message: "You forget to inlclude 'id' as a param in test script",
        extensions: { code: "TEST_CODE_ERROR" },
      } as ServerError;
    const errorReturns = this.getErrors();
    const successReturns = this.getSuccesses();
    if (errorReturns.length) {
      // Mock failed
      throw errorReturns;
    } else if (successReturns.length) {
      // Mock successful
      return (successReturns[0].data as unknown) as Meet;
    } else {
      throw {
        message: "This shouldn't happen",
        extensions: { code: "UNEXPECTED" },
      } as ServerError;
    }
  }
  async createMeet(params: CreateMeetParams): Promise<Meet> {
    if (this.getErrors().length) throw this.getErrors().map((er) => er.errors)[0];
    if (params && this.getSuccesses().length) {
      return (this.getSuccesses()[0].data as unknown) as Meet;
    } else {
      throw { message: "This shouldn't happen", extensions: { code: "UNEXPECTED" } } as ServerError;
    }
  }
  async editMeet(id: string, params: EditMeetParams): Promise<Meet> {
    if (!id || !params) throw "You messed up in writing your test. Make sure id and input params are passed as args";
    if (this.getErrors().length) throw this.getErrors().map((er) => er.errors)[0];
    if (id && params && this.getSuccesses().length) {
      return (this.getSuccesses()[0].data as unknown) as Meet;
    } else {
      const index: number = this.data.findIndex((m) => m.id === id);
      const prevMeet: Meet = this.data[index];
      return (this.data[index] = { ...prevMeet, ...params });
    }
  }
  async deleteMeet(id: string): Promise<boolean> {
    if (this.getErrors().length) throw this.getErrors().map((er) => er.errors)[0];
    if (id && this.getSuccesses().length) {
      return (this.getSuccesses()[0].data as unknown) as boolean;
    } else {
      throw { message: "This shouldn't happen", extensions: { code: "UNEXPECTED" } } as ServerError;
    }
  }
  async registerForMeet(meetId: string): Promise<boolean> {
    if (this.getErrors().length) throw this.getErrors().map((er) => er.errors)[0];
    if (meetId && this.getSuccesses().length) {
      return (this.getSuccesses()[0].data as unknown) as boolean;
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

  getSuccesses = () => {
    return this.mockReturns.filter(
      (mr: ApiResponseRaw<SuccessDataTypes | null>) => (mr.data as unknown) as ApiResponseRaw<SuccessDataTypes>,
    );
  };

  clearMockReturns() {
    this.mockReturns = [];
  }
}
