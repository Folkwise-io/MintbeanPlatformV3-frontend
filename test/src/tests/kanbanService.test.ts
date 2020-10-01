import { TestManager } from "../TestManager";
import { kanbanFactory } from "../factories/kanban.factory";

const fakeKanbans = kanbanFactory.bulk(6);

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
});
