import { KanbanDao } from "../../../src/daos/KanbanDao";

type SuccessDataTypes = Kanban | KanbanCard | boolean;

// TODO: implement cookie header mocking for authorization tests
export class TestKanbanDao implements KanbanDao {
  kanbans: Kanban[];
  kanbanCards: KanbanCard[];
  private mockReturns: ApiResponseRaw<SuccessDataTypes | null>[];

  constructor() {
    this.kanbans = [];
    this.kanbanCards = [];
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
    } else if (this.kanbans) {
      const result = this.kanbans.find((r: Kanban) => r.id === id);
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
  async deleteKanban(id: string): Promise<boolean> {
    if (this.getErrors().length) throw this.getErrors().map((er) => er.errors)[0];
    if (id && this.getSuccesses().length) {
      return (this.getSuccesses()[0].data as unknown) as boolean;
    } else {
      throw { message: "This shouldn't happen", extensions: { code: "UNEXPECTED" } } as ServerError;
    }
  }

  // KanbanCard ----------- -----------------------
  async fetchKanbanCard(id: string): Promise<KanbanCard> {
    if (!id)
      throw {
        message: "You forget to inlclude 'id' as a param in test script",
        extensions: { code: "TEST_CODE_ERROR" },
      } as ServerError;
    const errorReturns = this.getErrors();
    if (errorReturns.length) {
      // Mock failed
      throw errorReturns;
    } else if (this.kanbanCards) {
      const result = this.kanbanCards.find((r: KanbanCard) => r.id === id);
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
  async createKanbanCard(input: CreateKanbanCardInput): Promise<KanbanCard> {
    if (this.getErrors().length) throw this.getErrors().map((er) => er.errors)[0];
    if (input && this.getSuccesses().length) {
      return (this.getSuccesses()[0].data as unknown) as KanbanCard;
    } else {
      throw { message: "This shouldn't happen", extensions: { code: "UNEXPECTED" } } as ServerError;
    }
  }
  async editKanbanCard(id: string, input: EditKanbanCardInput): Promise<KanbanCard> {
    if (!id || !input) throw "You messed up in writing your test. Make sure id and input are passed as args";
    if (this.getErrors().length) throw this.getErrors().map((er) => er.errors)[0];
    if (id && input && this.getSuccesses().length) {
      return (this.getSuccesses()[0].data as unknown) as KanbanCard;
    } else {
      const index: number = this.kanbanCards.findIndex((m) => m.id === id);
      const prevKanbanCard: KanbanCard = this.kanbanCards[index];
      return (this.kanbanCards[index] = { ...prevKanbanCard, ...input });
    }
  }
  async deleteKanbanCard(id: string): Promise<boolean> {
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
