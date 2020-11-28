import { TestManager } from "../TestManager";
import { kanbanCanonCardFactory, kanbanCanonFactory } from "../factories/kanban.factory";

const fakeKanbanCanons = kanbanCanonFactory.bulk(6);
const fakeKanbanCanonCards = kanbanCanonCardFactory.bulk(6);
const SERVER_ERR_MESSAGE = "Test msg";
const FAKE_ERROR = { data: null, errors: [{ message: SERVER_ERR_MESSAGE, extensions: { code: "TEST" } }] };

describe("KanbanCanonService", () => {
  let testManager: TestManager;

  describe("fetchKanbanCanon()", () => {
    beforeEach(() => {
      testManager = TestManager.build().addKanbanCanons(fakeKanbanCanons);
    });

    afterEach(() => {
      // Just to be safe!
      testManager.configureContext((context) => {
        context.kanbanCanonDao.clearMockReturns();
      });
    });
    it("returns an existing KanbanCanon by Id", async () => {
      await testManager.execute((context) => {
        const index = 0;
        const kanbanCanonId = fakeKanbanCanons[index].id;
        return context.kanbanCanonService.fetchKanbanCanon(kanbanCanonId).then((result) => {
          expect(result).toMatchObject(fakeKanbanCanons[index]);
        });
      });
    });
    it("logs an error and throws toast if no kanbanCanon found", async () => {
      await testManager.execute((context) => {
        return context.kanbanCanonService.fetchKanbanCanon("this0id0wont0exist").then((result) => {
          expect(result).toBe(undefined);
        });
      });
      const finalState = testManager.store.getState();
      expect(finalState.toasts[0].type).toBe("DANGER");
      expect(finalState.errors.length).toBe(1);
    });
  });
  describe("createKanbanCanon()", () => {
    beforeEach(() => {
      testManager = TestManager.build();
    });

    afterEach(() => {
      // Just to be safe!
      testManager.configureContext((context) => {
        context.kanbanCanonDao.clearMockReturns();
      });
    });
    const newKanbanCanon = kanbanCanonFactory.one({ kanbanCanonId: "afakekanbanCanonid" });
    const newKanbanCanonInput: CreateKanbanCanonInput = {
      title: newKanbanCanon.title,
      description: newKanbanCanon.description,
    };
    it("returns a KanbanCanon and throws SUCCESS toast on good input", async () => {
      await testManager
        .configureContext((context) => {
          context.kanbanCanonDao.mockReturn({ data: newKanbanCanon });
        })
        .execute((context) => {
          return context.kanbanCanonService.createKanbanCanon(newKanbanCanonInput).then((result) => {
            expect(result).toMatchObject(newKanbanCanon);
          });
        });
      const finalState = testManager.store.getState();
      expect(finalState.toasts[0].type).toBe("SUCCESS");
    });
    it("logs error and throws toast on failure", async () => {
      await testManager
        .configureContext((context) => {
          context.kanbanCanonDao.mockReturn(FAKE_ERROR);
        })
        .execute((context) => {
          return context.kanbanCanonService.createKanbanCanon(newKanbanCanonInput).then((result) => {
            expect(result).toBe(undefined);
          });
        });
      const finalState = testManager.store.getState();
      expect(finalState.errors[0].message).toBe(SERVER_ERR_MESSAGE);
      expect(finalState.toasts[0].type).toBe("DANGER");
    });
  });
  describe("updateKanbanCanonCardPositions()", () => {
    const KANBAN_CANON_ID = "somethin";
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
        context.kanbanCanonDao.clearMockReturns();
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
          context.kanbanCanonDao.mockReturn({ data: expectedCardPositions });
        })
        .execute((context) => {
          return context.kanbanCanonService.updateCardPositions(KANBAN_CANON_ID, input).then((result) => {
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
          context.kanbanCanonDao.mockReturn(FAKE_ERROR);
        })
        .execute((context) => {
          return context.kanbanCanonService.updateCardPositions(KANBAN_CANON_ID, input).then((result) => {
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
  describe("editKanbanCanon()", () => {
    beforeEach(() => {
      testManager = TestManager.build();
    });

    afterEach(() => {
      // Just to be safe!
      testManager.configureContext((context) => {
        context.kanbanCanonDao.clearMockReturns();
      });
    });
    const existingKanbanCanon = kanbanCanonFactory.one({ kanbanCanonId: "afakekanbanCanonid" });
    const NEW_TITLE = "New title";
    const editKanbanCanonInput: EditKanbanCanonInput = {
      title: NEW_TITLE,
      description: existingKanbanCanon.description,
    };

    it("returns the edited kanbanCanon on success", async () => {
      await testManager.addKanbanCanons([existingKanbanCanon]).execute((context) => {
        return context.kanbanCanonService
          .editKanbanCanon(existingKanbanCanon.id, editKanbanCanonInput)
          .then((result) => {
            if (result) {
              expect(result.title).toBe(NEW_TITLE);
            } else {
              throw "This shouldn't be reached";
            }
          });
      });
    });
    it("logs error and throws toast on failure", async () => {
      await testManager
        .configureContext((context) => {
          context.kanbanCanonDao.mockReturn(FAKE_ERROR);
        })
        .execute((context) => {
          return context.kanbanCanonService
            .editKanbanCanon(existingKanbanCanon.id, editKanbanCanonInput)
            .then((result) => {
              expect(result).toBe(undefined);
            });
        });
      const finalState = testManager.store.getState();
      expect(finalState.errors[0].message).toBe(SERVER_ERR_MESSAGE);
      expect(finalState.toasts[0].type).toBe("DANGER");
    });
  });

  describe("fetchKanbanCanonCard()", () => {
    beforeEach(() => {
      testManager = TestManager.build().addKanbanCanonCards(fakeKanbanCanonCards);
    });

    afterEach(() => {
      // Just to be safe!
      testManager.configureContext((context) => {
        context.kanbanCanonDao.clearMockReturns();
      });
    });
    it("returns an existing KanbanCanon by Id", async () => {
      await testManager.execute((context) => {
        const index = 0;
        const kanbanCanonCardId = fakeKanbanCanonCards[index].id;
        return context.kanbanCanonService.fetchKanbanCanonCard(kanbanCanonCardId).then((result) => {
          expect(result).toMatchObject(fakeKanbanCanonCards[index]);
        });
      });
    });
    it("logs an error and throws toast if no KanbanCanon Card found", async () => {
      await testManager.execute((context) => {
        return context.kanbanCanonService.fetchKanbanCanonCard("this0id0wont0exist").then((result) => {
          expect(result).toBe(undefined);
        });
      });
      const finalState = testManager.store.getState();
      expect(finalState.toasts[0].type).toBe("DANGER");
      expect(finalState.errors.length).toBe(1);
    });
  });
  describe("createKanbanCanonCard()", () => {
    beforeEach(() => {
      testManager = TestManager.build().addKanbanCanons(fakeKanbanCanons);
    });

    afterEach(() => {
      // Just to be safe!
      testManager.configureContext((context) => {
        context.kanbanCanonDao.clearMockReturns();
      });
    });
    const kanbanCanonId = "abc";
    const newKanbanCanonCard = kanbanCanonCardFactory.one({ kanbanCanonId: kanbanCanonId });
    const newKanbanCanonCardInput: CreateKanbanCanonCardInput = {
      title: newKanbanCanonCard.title,
      body: newKanbanCanonCard.body,
      kanbanCanonId,
    };
    it("returns a KanbanCanonCard and throws SUCCESS toast on good input", async () => {
      await testManager
        .configureContext((context) => {
          context.kanbanCanonDao.mockReturn({ data: newKanbanCanonCard });
        })
        .execute((context) => {
          return context.kanbanCanonService.createKanbanCanonCard(newKanbanCanonCardInput).then((result) => {
            expect(result).toMatchObject(newKanbanCanonCard);
          });
        });
      const finalState = testManager.store.getState();
      expect(finalState.toasts[0].type).toBe("SUCCESS");
    });
    it("logs error and throws toast on failure", async () => {
      await testManager
        .configureContext((context) => {
          context.kanbanCanonDao.mockReturn(FAKE_ERROR);
        })
        .execute((context) => {
          return context.kanbanCanonService.createKanbanCanonCard(newKanbanCanonCardInput).then((result) => {
            expect(result).toBe(undefined);
          });
        });
      const finalState = testManager.store.getState();
      expect(finalState.errors[0].message).toBe(SERVER_ERR_MESSAGE);
      expect(finalState.toasts[0].type).toBe("DANGER");
    });
  });
  describe("editKanbanCanonCard()", () => {
    beforeEach(() => {
      testManager = TestManager.build().addKanbanCanons(fakeKanbanCanons);
    });

    afterEach(() => {
      // Just to be safe!
      testManager.configureContext((context) => {
        context.kanbanCanonDao.clearMockReturns();
      });
    });
    const kanbanCanonId = "abc";
    const existingKanbanCanonCard = kanbanCanonCardFactory.one({ kanbanCanonId: kanbanCanonId });
    const NEW_TITLE = "New title";
    const editKanbanCanonCardInput: EditKanbanCanonCardInput = {
      title: NEW_TITLE,
      body: existingKanbanCanonCard.body,
    };

    it("returns the edited KanbanCanonCard on success", async () => {
      await testManager.addKanbanCanonCards([existingKanbanCanonCard]).execute((context) => {
        return context.kanbanCanonService
          .editKanbanCanonCard(existingKanbanCanonCard.id, editKanbanCanonCardInput)
          .then((result) => {
            if (result) {
              expect(result.title).toBe(NEW_TITLE);
            } else {
              throw "This shouldn't be reached";
            }
          });
      });
    });
    it("logs error and throws toast on failure", async () => {
      await testManager
        .configureContext((context) => {
          context.kanbanCanonDao.mockReturn(FAKE_ERROR);
        })
        .execute((context) => {
          return context.kanbanCanonService
            .editKanbanCanonCard(existingKanbanCanonCard.id, editKanbanCanonCardInput)
            .then((result) => {
              expect(result).toBe(undefined);
            });
        });
      const finalState = testManager.store.getState();
      expect(finalState.errors[0].message).toBe(SERVER_ERR_MESSAGE);
      expect(finalState.toasts[0].type).toBe("DANGER");
    });
  });
  describe("deleteKanbanCanonCard()", () => {
    beforeEach(() => {
      testManager = TestManager.build();
    });

    afterEach(() => {
      // Just to be safe!
      testManager.configureContext((context) => {
        context.kanbanCanonDao.clearMockReturns();
      });
    });

    it("allows admin to delete KanbanCanon Card by id", async () => {
      await testManager
        .configureContext((context) => {
          context.kanbanCanonDao.mockReturn({ data: true });
        })
        .execute((context) => {
          return context.kanbanCanonService.deleteKanbanCanonCard("someuuid");
        });
      const storeState = testManager.store.getState();
      expect(storeState.errors.length).toBe(0);
      expect(storeState.toasts[0].type).toBe("SUCCESS");
    });
    it("logs error and throws server message toast on error", async () => {
      await testManager
        .configureContext((context) => {
          context.kanbanCanonDao.mockReturn({
            data: null,
            errors: [{ message: SERVER_ERR_MESSAGE, extensions: { code: "TEST_UNAUTHORIZED" } }],
          });
        })
        .execute((context) => {
          return context.kanbanCanonService.deleteKanbanCanonCard("someuuid");
        });

      const storeState = testManager.store.getState();
      expect(storeState.errors[0].message).toBe(SERVER_ERR_MESSAGE);
      const lastToast = storeState.toasts.length - 1;
      expect(storeState.toasts[lastToast].type).toBe("DANGER");
    });
  });
});
