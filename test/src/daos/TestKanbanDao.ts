import { KanbanDao } from "../../../src/daos/KanbanDao";

type SuccessDataTypes = Kanban | KanbanCanonCard | KanbanCardPositions | boolean;

// TODO: implement cookie header mocking for authorization tests
export class TestKanbanDao implements KanbanDao {
  kanbans: Kanban[];
  kanbanCards: KanbanCanonCard[];
  private mockReturns: ApiResponseRaw<SuccessDataTypes | null>[];

  constructor() {
    this.kanbans = [];
    this.kanbanCards = [];
    this.mockReturns = [];
  }

  // TODO: write test dao code
  // Kanban -----------------------------------------
  async fetchKanban(args: FetchKanbanArgs): Promise<Kanban> {
    if (!args.id)
      throw {
        message: "You forget to inlclude 'userId' or 'kanbanCanonId' as a param in test script",
        extensions: { code: "TEST_CODE_ERROR" },
      } as ServerError;
    const errorReturns = this.getErrors();
    if (errorReturns.length) {
      // Mock failed
      throw errorReturns;
    } else if (this.kanbans) {
      const result = this.kanbans.find((r: Kanban) => r.id === args.id);
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
  async createKanban(input: CreateKanbanInput): Promise<Kanban> {
    if (this.getErrors().length) throw this.getErrors().map((er) => er.errors)[0];
    if (input && this.getSuccesses().length) {
      return (this.getSuccesses()[0].data as unknown) as Kanban;
    } else {
      throw { message: "This shouldn't happen", extensions: { code: "UNEXPECTED" } } as ServerError;
    }
  }
  async updateCardPositions(id: string, input: UpdateCardPositionInput): Promise<KanbanCardPositions> {
    if (!id || !input) throw "You messed up in writing your test. Make sure id and input are passed as args";
    if (this.getErrors().length) throw this.getErrors().map((er) => er.errors)[0];
    if (id && input && this.getSuccesses().length) {
      return (this.getSuccesses()[0].data as unknown) as KanbanCardPositions;
    } else {
      throw { message: "This shouldn't happen", extensions: { code: "UNEXPECTED" } } as ServerError;
    }
  }
  async deleteKanban(id: string): Promise<boolean> {
    if (this.getErrors().length) throw this.getErrors().map((er) => er.errors)[0];
    if (id && this.getSuccesses().length) {
      return (this.getSuccesses()[0].data as unknown) as boolean;
    } else {
      throw { message: "This shouldn't happen", extensions: { code: "UNEXPECTED" } } as ServerError;
    }
  }

  // TestDao general methods -----------------------
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
