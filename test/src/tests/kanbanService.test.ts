import { TestManager } from "../TestManager";
import { kanbanCanonCardFactory, kanbanFactory } from "../factories/kanban.factory";

const USERID = "abc123";
const KANBAN_CANON_ID = "xyz123";
const KANBAN = kanbanFactory.one({ userId: USERID, kanbanCanonId: KANBAN_CANON_ID });
const SERVER_ERR_MESSAGE = "Test msg";
const FAKE_ERROR = { data: null, errors: [{ message: SERVER_ERR_MESSAGE, extensions: { code: "TEST" } }] };

describe("KanbanService", () => {
  let testManager: TestManager;

  describe("fetchKanban()", () => {
    beforeEach(() => {
      testManager = TestManager.build();
      testManager.addKanbans([KANBAN]);
    });

    afterEach(() => {
      // Just to be safe!
      testManager.configureContext((context) => {
        context.kanbanDao.clearMockReturns();
      });
    });

    it("returns an existing Kanban by Id", async () => {
      await testManager.execute((context) => {
        return context.kanbanService.fetchKanban({ id: KANBAN.id }).then((result) => {
          expect(result).toMatchObject(KANBAN);
        });
      });
    });
    it("logs an error and throws toast if no kanban found", async () => {
      await testManager.execute((context) => {
        return context.kanbanService.fetchKanban({ id: "thisisafakeid" }).then((result) => {
          expect(result).toBe(undefined);
        });
      });
      const finalState = testManager.store.getState();
      expect(finalState.toasts[0].type).toBe("DANGER");
      expect(finalState.errors.length).toBe(1);
    });
  });
  describe("createKanban()", () => {
    beforeEach(() => {
      testManager = TestManager.build();
    });

    afterEach(() => {
      // Just to be safe!
      testManager.configureContext((context) => {
        context.kanbanDao.clearMockReturns();
      });
    });
    const newKanbanInput: CreateKanbanInput = {
      userId: KANBAN.userId,
      kanbanCanonId: KANBAN.kanbanCanonId,
    };
    it("returns a Kanban and throws SUCCESS toast on good input", async () => {
      await testManager
        .configureContext((context) => {
          context.kanbanDao.mockReturn({ data: KANBAN });
        })
        .execute((context) => {
          return context.kanbanService.createKanban(newKanbanInput).then((result) => {
            expect(result).toMatchObject(KANBAN);
          });
        });
      const finalState = testManager.store.getState();
      expect(finalState.toasts[0].type).toBe("SUCCESS");
    });
    it("logs error and throws toast on failure", async () => {
      await testManager
        .configureContext((context) => {
          context.kanbanDao.mockReturn(FAKE_ERROR);
        })
        .execute((context) => {
          return context.kanbanService.createKanban(newKanbanInput).then((result) => {
            expect(result).toBe(undefined);
          });
        });
      const finalState = testManager.store.getState();
      expect(finalState.errors[0].message).toBe(SERVER_ERR_MESSAGE);
      expect(finalState.toasts[0].type).toBe("DANGER");
    });
  });
  describe("updateKanbanCardPositions()", () => {
    const KANBAN_CANON_CARDS = kanbanCanonCardFactory
      .bulk(3)
      .map((kcc) => ({ ...kcc, kanbanCanonId: KANBAN_CANON_ID }));
    const A = KANBAN_CANON_CARDS[0];
    const B = KANBAN_CANON_CARDS[1];
    const C = KANBAN_CANON_CARDS[2];
    const input = {
      cardId: A.id,
      status: "TODO" as KanbanCanonCardStatus,
      index: 1,
    };

    beforeEach(() => {
      testManager = TestManager.build();
    });

    afterEach(() => {
      // Just to be safe!
      testManager.configureContext((context) => {
        context.kanbanDao.clearMockReturns();
      });
    });

    it("updates a card's index within a column silently (no toasts)", async () => {
      const expectedCardPositions: KanbanCardPositions = {
        todo: [B.id, C.id],
        wip: [A.id],
        done: [],
      };
      await testManager
        .configureContext((context) => {
          context.kanbanDao.mockReturn({ data: expectedCardPositions });
        })
        .execute((context) => {
          return context.kanbanService.updateCardPositions(KANBAN_CANON_ID, input).then((result) => {
            if (result) {
              expect(result).toBe(expectedCardPositions);
            } else {
              throw "This shouldn't be reached";
            }
          });
        });
      const finalState = testManager.store.getState();
      expect(finalState.toasts).toHaveLength(0);
      expect(finalState.errors).toHaveLength(0);
    });
    it("logs error and throws toast on server error", async () => {
      await testManager
        .configureContext((context) => {
          context.kanbanDao.mockReturn(FAKE_ERROR);
        })
        .execute((context) => {
          return context.kanbanService.updateCardPositions(KANBAN.id, input).then((result) => {
            if (result) {
              expect(result).toBe(undefined);
            }
          });
        });
      const finalState = testManager.store.getState();
      expect(finalState.errors[0].message).toBe(SERVER_ERR_MESSAGE);
      expect(finalState.toasts[0].type).toBe("DANGER");
    });
  });
});
