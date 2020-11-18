import { BadgeDao } from "../../../src/daos/BadgeDao";
import { Badge, EditBadgeParams } from "../../../src/types/badge";
import { badgeFactory } from "../factories/badge.factory";

type SuccessDataTypes = Badge[] | Badge | boolean;

export class TestBadgeDao implements BadgeDao {
  data: Badge[];
  private mockReturns: ApiResponseRaw<SuccessDataTypes | null>[];
  constructor() {
    this.data = badgeFactory.bulk();
    this.mockReturns = [];
  }

  async fetchBadges(): Promise<Badge[]> {
    if (this.getErrors().length) throw this.getErrors().map((er) => er.errors)[0];
    return this.data;
  }

  async fetchBadge(id: string): Promise<Badge> {
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
      return (successReturns[0].data as unknown) as Badge;
    } else {
      throw {
        message: "This shouldn't happen",
        extensions: { code: "UNEXPECTED" },
      } as ServerError;
    }
  }

  async createBadge(params: Badge): Promise<Badge> {
    if (this.getErrors().length) throw this.getErrors().map((er) => er.errors)[0];
    if (params && this.getSuccesses().length) {
      return (this.getSuccesses()[0].data as unknown) as Badge;
    } else {
      throw { message: "This shouldn't happen", extensions: { code: "UNEXPECTED" } } as ServerError;
    }
  }

  async editBadge(id: string, params: EditBadgeParams): Promise<Badge> {
    if (!id || !params) throw "You messed up in writing your test. Make sure id and input params are passed as args";
    if (this.getErrors().length) throw this.getErrors().map((er) => er.errors)[0];
    if (id && params && this.getSuccesses().length) {
      return (this.getSuccesses()[0].data as unknown) as Badge;
    } else {
      const index: number = this.data.findIndex((m) => m.id === id);
      const prevBadge: Badge = this.data[index];
      return (this.data[index] = { ...prevBadge, ...params });
    }
  }

  async deleteBadge(id: string): Promise<boolean> {
    if (this.getErrors().length) throw this.getErrors().map((er) => er.errors)[0];
    if (id && this.getSuccesses().length) {
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
