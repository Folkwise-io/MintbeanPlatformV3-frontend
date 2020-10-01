import { KanbanDao } from "../../../src/daos/KanbanDao";

type SuccessDataTypes = Kanban;

// TODO: implement cookie header mocking for authorization tests
export class TestKanbanDao implements KanbanDao {
  data: Kanban[] | null;
  private mockReturns: ApiResponseRaw<SuccessDataTypes | null>[];

  constructor() {
    this.data = null;
    this.mockReturns = [];
  }

  // Kanban -----------------------------------------
  async fetchKanban(id: string): Promise<Kanban> {
    if (!id)
      throw {
        message: "You forget to inlclude 'id' as a param in test script",
        extensions: { code: "TEST_CODE_ERROR" },
      } as ServerError;
    const errorReturns = this.getErrors();
    if (errorReturns.length) {
      // Mock failed
      throw errorReturns;
    } else if (this.data) {
      const result = this.data.find((r: Kanban) => r.id === id);
      if (result) {
        return result;
      } else {
        throw {
          message: "No kanban with that id found",
          extensions: { code: "TEST_CODE_ERROR" },
        } as ServerError;
      }
    } else {
      throw {
        message: "This shouldn't happen",
        extensions: { code: "UNEXPECTED" },
      } as ServerError;
    }
  }

  mockReturn(mr: ApiResponseRaw<SuccessDataTypes | null>): void {
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

  clearMockReturns(): void {
    this.mockReturns = [];
  }
}
