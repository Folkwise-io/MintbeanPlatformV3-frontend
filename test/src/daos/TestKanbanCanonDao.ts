import { KanbanCanonDao } from "../../../src/daos/KanbanCanonDao";

type SuccessDataTypes = KanbanCanon | KanbanCanonCard | boolean;

// TODO: implement cookie header mocking for authorization tests
export class TestKanbanCanonDao implements KanbanCanonDao {
  kanbanCanons: KanbanCanon[];
  kanbanCanonCards: KanbanCanonCard[];
  private mockReturns: ApiResponseRaw<SuccessDataTypes | null>[];

  constructor() {
    this.kanbanCanons = [];
    this.kanbanCanonCards = [];
    this.mockReturns = [];
  }
  updateCardPositions(id: string, input: UpdateCardPositionInput): Promise<KanbanCardPositions> {
    throw new Error("Method not implemented.");
  }

  // KanbanCanon -----------------------------------------
  async fetchKanbanCanon(id: string): Promise<KanbanCanon> {
    if (!id)
      throw {
        message: "You forget to inlclude 'id' as a param in test script",
        extensions: { code: "TEST_CODE_ERROR" },
      } as ServerError;
    const errorReturns = this.getErrors();
    if (errorReturns.length) {
      // Mock failed
      throw errorReturns;
    } else if (this.kanbanCanons) {
      const result = this.kanbanCanons.find((r: KanbanCanon) => r.id === id);
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
  async createKanbanCanon(input: CreateKanbanCanonInput): Promise<KanbanCanon> {
    if (this.getErrors().length) throw this.getErrors().map((er) => er.errors)[0];
    if (input && this.getSuccesses().length) {
      return (this.getSuccesses()[0].data as unknown) as KanbanCanon;
    } else {
      throw { message: "This shouldn't happen", extensions: { code: "UNEXPECTED" } } as ServerError;
    }
  }
  async editKanbanCanon(id: string, input: EditKanbanCanonInput): Promise<KanbanCanon> {
    if (!id || !input) throw "You messed up in writing your test. Make sure id and input are passed as args";
    if (this.getErrors().length) throw this.getErrors().map((er) => er.errors)[0];
    if (id && input && this.getSuccesses().length) {
      return (this.getSuccesses()[0].data as unknown) as KanbanCanon;
    } else {
      const index: number = this.kanbanCanons.findIndex((m) => m.id === id);
      const prevKanbanCanon: KanbanCanon = this.kanbanCanons[index];
      return (this.kanbanCanons[index] = { ...prevKanbanCanon, ...input });
    }
  }
  async deleteKanbanCanon(id: string): Promise<boolean> {
    if (this.getErrors().length) throw this.getErrors().map((er) => er.errors)[0];
    if (id && this.getSuccesses().length) {
      return (this.getSuccesses()[0].data as unknown) as boolean;
    } else {
      throw { message: "This shouldn't happen", extensions: { code: "UNEXPECTED" } } as ServerError;
    }
  }

  // KanbanCanonCard ----------- -----------------------
  async fetchKanbanCanonCard(id: string): Promise<KanbanCanonCard> {
    if (!id)
      throw {
        message: "You forget to inlclude 'id' as a param in test script",
        extensions: { code: "TEST_CODE_ERROR" },
      } as ServerError;
    const errorReturns = this.getErrors();
    if (errorReturns.length) {
      // Mock failed
      throw errorReturns;
    } else if (this.kanbanCanonCards) {
      const result = this.kanbanCanonCards.find((r: KanbanCanonCard) => r.id === id);
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
  async createKanbanCanonCard(input: CreateKanbanCanonCardInput): Promise<KanbanCanonCard> {
    if (this.getErrors().length) throw this.getErrors().map((er) => er.errors)[0];
    if (input && this.getSuccesses().length) {
      return (this.getSuccesses()[0].data as unknown) as KanbanCanonCard;
    } else {
      throw { message: "This shouldn't happen", extensions: { code: "UNEXPECTED" } } as ServerError;
    }
  }
  async editKanbanCanonCard(id: string, input: EditKanbanCanonCardInput): Promise<KanbanCanonCard> {
    if (!id || !input) throw "You messed up in writing your test. Make sure id and input are passed as args";
    if (this.getErrors().length) throw this.getErrors().map((er) => er.errors)[0];
    if (id && input && this.getSuccesses().length) {
      return (this.getSuccesses()[0].data as unknown) as KanbanCanonCard;
    } else {
      const index: number = this.kanbanCanonCards.findIndex((m) => m.id === id);
      const prevKanbanCanonCard: KanbanCanonCard = this.kanbanCanonCards[index];
      return (this.kanbanCanonCards[index] = { ...prevKanbanCanonCard, ...input });
    }
  }
  async deleteKanbanCanonCard(id: string): Promise<boolean> {
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
