import { ProjectDao } from "../../../src/daos/ProjectDao";

type SuccessDataTypes = Project | boolean;

// TODO: implement cookie header mocking for authorization tests
export class TestProjectDao implements ProjectDao {
  data: Project[] | null;
  private mockReturns: ApiResponseRaw<SuccessDataTypes | null>[];

  constructor() {
    this.data = null;
    this.mockReturns = [];
  }

  async fetchProject(id: string): Promise<Project> {
    if (!id)
      throw {
        message: "You forget to inlclude 'id' as a param in test script",
        extensions: { code: "TEST_CODE_ERROR" },
      } as ServerError;
    const errorReturns = this.getErrors();
    const successReturns = this.getSuccesses();
    if (errorReturns.length) {
      // Mock failed
      throw errorReturns[0].errors;
    } else if (successReturns.length) {
      // Mock successful
      return (successReturns[0].data as unknown) as Project;
    } else {
      throw {
        message: "This shouldn't happen",
        extensions: { code: "UNEXPECTED" },
      } as ServerError;
    }
  }

  async createProject(params: CreateProjectParams): Promise<Project> {
    if (this.getErrors().length) throw this.getErrors().map((er) => er.errors)[0];
    if (params && this.getSuccesses().length) {
      return (this.getSuccesses()[0].data as unknown) as Project;
    } else {
      throw { message: "This shouldn't happen", extensions: { code: "UNEXPECTED" } } as ServerError;
    }
  }

  async deleteProject(id: string): Promise<boolean> {
    if (this.getErrors().length) throw this.getErrors().map((er) => er.errors)[0];
    if (id && this.getSuccesses().length) {
      return (this.getSuccesses()[0].data as unknown) as boolean;
    } else {
      throw { message: "This shouldn't happen", extensions: { code: "UNEXPECTED" } } as ServerError;
    }
  }

  async awardBadgesToProject(projectId: string, badgeIds: string[]): Promise<Project> {
    const errorReturns = this.getErrors();
    const successReturns = this.getSuccesses();
    if (errorReturns.length) {
      // Mock failed
      throw errorReturns[0].errors;
    } else if (successReturns.length && projectId && badgeIds) {
      // Mock successful
      return (successReturns[0].data as unknown) as Project;
    } else {
      throw {
        message: "This shouldn't happen",
        extensions: { code: "UNEXPECTED" },
      } as ServerError;
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
