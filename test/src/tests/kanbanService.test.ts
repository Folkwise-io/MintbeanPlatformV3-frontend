import { TestManager } from "../TestManager";
import { kanbanCardFactory, kanbanFactory } from "../factories/kanban.factory";

const fakeKanbans = kanbanFactory.bulk(6);
const SERVER_ERR_MESSAGE = "Test msg";
const FAKE_ERROR = { data: null, errors: [{ message: SERVER_ERR_MESSAGE, extensions: { code: "TEST" } }] };

describe("KanbanService", () => {
  let testManager: TestManager;

  describe("fetchKanban()", () => {
    beforeEach(() => {
      testManager = TestManager.build().addKanbans(fakeKanbans);
    });

    afterEach(() => {
      // Just to be safe!
      testManager.configureContext((context) => {
        context.kanbanDao.clearMockReturns();
      });
    });
    it("returns an existing Kanban by Id", async () => {
      await testManager.execute((context) => {
        const index = 0;
        const kanbanId = fakeKanbans[index].id;
        return context.kanbanService.fetchKanban(kanbanId).then((result) => {
          expect(result).toMatchObject(fakeKanbans[index]);
        });
      });
    });
    it("logs an error and throws toast if no kanban found", async () => {
      await testManager.execute((context) => {
        return context.kanbanService.fetchKanban("this0id0wont0exist").then((result) => {
          expect(result).toBe(undefined);
        });
      });
      const finalState = testManager.store.getState();
      expect(finalState.toasts[0].type).toBe("DANGER");
      expect(finalState.errors.length).toBe(1);
    });
  });
  describe("createKanbanCard()", () => {
    beforeEach(() => {
      testManager = TestManager.build().addKanbans(fakeKanbans);
    });

    afterEach(() => {
      // Just to be safe!
      testManager.configureContext((context) => {
        context.kanbanDao.clearMockReturns();
      });
    });
    const newKanbanCard = kanbanCardFactory.one({ kanbanId: "afakekanbanid" });
    const newKanbanCardInput: CreateKanbanCardInput = {
      kanbanId: newKanbanCard.id,
      title: newKanbanCard.title,
      body: newKanbanCard.body,
    };
    it("returns a KanbanCard and throws SUCCESS toast on good input", async () => {
      await testManager
        .configureContext((context) => {
          context.kanbanDao.mockReturn({ data: newKanbanCard });
        })
        .execute((context) => {
          return context.kanbanService.createKanbanCard(newKanbanCardInput).then((result) => {
            expect(result).toMatchObject(newKanbanCard);
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
          return context.kanbanService.createKanbanCard(newKanbanCardInput).then((result) => {
            expect(result).toBe(undefined);
          });
        });
      const finalState = testManager.store.getState();
      expect(finalState.errors[0].message).toBe(SERVER_ERR_MESSAGE);
      expect(finalState.toasts[0].type).toBe("DANGER");
    });
  });
  describe("editKanbanCard()", () => {
    beforeEach(() => {
      testManager = TestManager.build().addKanbans(fakeKanbans);
    });

    afterEach(() => {
      // Just to be safe!
      testManager.configureContext((context) => {
        context.kanbanDao.clearMockReturns();
      });
    });
    const existingKanbanCard = kanbanCardFactory.one({ kanbanId: "afakekanbanid" });
    const NEW_TITLE = "New title";
    const editKanbanCardInput: EditKanbanCardInput = {
      kanbanId: existingKanbanCard.id,
      title: NEW_TITLE,
      body: existingKanbanCard.body,
    };

    it("returns the edited meet on success", async () => {
      await testManager.addKanbanCards([existingKanbanCard]).execute((context) => {
        return context.kanbanService.editKanbanCard(existingKanbanCard.id, editKanbanCardInput).then((result) => {
          if (result) {
            expect(result.title).toBe(NEW_TITLE);
          } else {
            throw "This shouldn't be reached";
          }
        });
      });
    });
    it("returns logs error and throws toast on failure", async () => {
      await testManager
        .configureContext((context) => {
          context.kanbanDao.mockReturn(FAKE_ERROR);
        })
        .execute((context) => {
          return context.kanbanService.editKanbanCard(existingKanbanCard.id, editKanbanCardInput).then((result) => {
            expect(result).toBe(undefined);
          });
        });
      const finalState = testManager.store.getState();
      expect(finalState.errors[0].message).toBe(SERVER_ERR_MESSAGE);
      expect(finalState.toasts[0].type).toBe("DANGER");
    });
  });
});
