import { badgeFactory } from "../factories/badge.factory";
import { TestManager } from "../TestManager";

const fakeBadges = badgeFactory.bulk(6);

describe("BadgeService", () => {
  let testManager: TestManager;

  describe("fetchBadges()", () => {
    beforeEach(() => {
      testManager = TestManager.build();
    });

    afterEach(() => {
      testManager.configureContext((context) => {
        context.badgeDao.clearMockReturns();
      });
    });
    it("returns a list of badges on success", async () => {
      const tm = testManager.addBadges(fakeBadges);

      await tm.execute((context) => {
        return context.badgeService.fetchBadges().then((result) => {
          expect(result.length).toBe(6);
        });
      });
    });
    it("returns an empty array if no badges are in the db", async () => {
      const tm = testManager.addBadges([]);

      await tm.execute((context) => {
        return context.badgeService.fetchBadges().then((result) => {
          expect(result.length).toBe(0);
        });
      });
    });
    it("logs an error and throws toast if fetch fails", async () => {
      const ERROR_MESSAGE = "test";
      await testManager
        .configureContext((context) => {
          context.badgeDao.mockReturn({
            data: null,
            errors: [{ message: ERROR_MESSAGE, extensions: { code: "TEST" } }],
          });
        })
        .execute((context) => context.badgeService.fetchBadges());
      const storeState = testManager.store.getState();
      expect(storeState.errors[0].message).toBe(ERROR_MESSAGE);
    });
  });

  describe("fetchBadge()", () => {
    beforeEach(() => {
      testManager = TestManager.build();
    });
    afterEach(() => {
      testManager.configureContext((context) => {
        context.badgeDao.clearMockReturns();
      });
    });
    const badge = badgeFactory.one();
    const id = badge.badgeId;
    it("returns a meet by id", async () => {
      await testManager.configureContext((context) => {
        return context.badgeService.fetchBadge(id).then((result) => {
          expect(result).toMatchObject(badge);
        });
      });
    });
    it("logs an error and throws toast if fetch fails", async () => {
      const ERROR_MESSAGE = "test";
      await testManager
        .configureContext((context) => {
          context.badgeDao.mockReturn({
            data: null,
            errors: [{ message: ERROR_MESSAGE, extensions: { code: "TEST" } }],
          });
        })
        .execute((context) =>
          context.badgeService.fetchBadge("thiswontwork").then((result) => {
            expect(result).toBe(undefined);
          }),
        );
      const storeState = testManager.store.getState();
      expect(storeState.errors).toBeTruthy();
      expect(storeState.toasts[0].type).toBe("DANGER");
    });
  });
  describe("createBadge()", () => {
    beforeEach(() => {
      testManager = TestManager.build();
    });
    afterEach(() => {
      testManager.configureContext((context) => {
        context.badgeDao.clearMockReturns();
      });
    });
    const newBadge = badgeFactory.one();
    const validBadgeParams = {
      alias: newBadge.alias,
      title: newBadge.title,
      badgeShape: newBadge.badgeShape,
      faIcon: newBadge.faIcon,
      backgroundHex: newBadge.backgroundHex,
      iconHex: newBadge.iconHex,
      description: newBadge.description,
      weight: newBadge.weight,
    };
    it("returns the created badge on success", async () => {
      await testManager
        .configureContext((context) => {
          context.badgeDao.mockReturn({ data: newBadge });
        })
        .execute((context) => {
          return context.badgeService.createBadge(validBadgeParams).then((result) => {
            expect(result).toMatchObject(newBadge);
          });
        });
    });
    it("logs error and throws toast when server error is returned", async () => {
      const ERROR_MESSAGE = "test";
      await testManager
        .configureContext((context) => {
          context.badgeDao.mockReturn({
            data: null,
            errors: [{ message: ERROR_MESSAGE, extensions: { code: "TEST" } }],
          });
        })
        .execute((context) => context.badgeService.createBadge(validBadgeParams));
      const storeState = testManager.store.getState();
      expect(storeState.errors[0].message).toBe(ERROR_MESSAGE);
      expect(storeState.toasts[0].message).toBe(ERROR_MESSAGE);
      expect(storeState.toasts[0].type).toBe("DANGER");
    });
  });
  describe("deleteBadge()", () => {
    beforeEach(() => {
      testManager = TestManager.build();
    });

    afterEach(() => {
      // Just to be safe!
      testManager.configureContext((context) => {
        context.badgeDao.clearMockReturns();
      });
    });

    it("allows admin to delete meet by id", async () => {
      await testManager
        .configureContext((context) => {
          context.badgeDao.mockReturn({ data: true });
        })
        .execute((context) => {
          return context.badgeDao.deleteBadge("someuuid");
        });
      const storeState = testManager.store.getState();
      expect(storeState.errors.length).toBe(0);
    });
    it("logs error and throws server message toast on error", async () => {
      const SERVER_ERR_MSG = "test";
      await testManager
        .configureContext((context) => {
          context.badgeDao.mockReturn({
            data: null,
            errors: [{ message: SERVER_ERR_MSG, extensions: { code: "TEST_UNAUTHORIZED" } }],
          });
        })
        .execute((context) => {
          return context.badgeService.deleteBadge("someuuid");
        });

      const storeState = testManager.store.getState();
      expect(storeState.errors[0].message).toBe(SERVER_ERR_MSG);
      const lastToast = storeState.toasts.length - 1;
      expect(storeState.toasts[lastToast].type).toBe("DANGER");
    });
  });
  describe("editMeet()", () => {
    beforeEach(() => {
      testManager = TestManager.build();
    });

    afterEach(() => {
      // Just to be safe!
      testManager.configureContext((context) => {
        context.badgeDao.clearMockReturns();
      });
    });

    // TODO: implement cookie header mocking for authorization tests
    // it("only permits admins to create badges", async () => {
    //   const user = userFactory.one();
    //    ...
    // });
    const existingBadge = badgeFactory.one();
    const NEW_TITLE = "New title";
    const updatedBadgeParams = {
      badgeId: existingBadge.badgeId,
      alias: existingBadge.alias,
      title: NEW_TITLE,
      badgeShape: existingBadge.badgeShape,
      faIcon: existingBadge.faIcon,
      backgroundHex: existingBadge.backgroundHex,
      iconHex: existingBadge.iconHex,
      description: existingBadge.description,
      weight: existingBadge.weight,
    };
    it("returns the edited meet on success", async () => {
      await testManager
        // add existing meet
        .addBadges([existingBadge])
        .execute((context) => {
          return context.badgeService.editBadge(existingBadge.badgeId, updatedBadgeParams).then((result) => {
            if (result) {
              expect(result.title).toBe(NEW_TITLE);
            } else {
              throw "This shouldn't be reached";
            }
          });
        });
    });
    it("logs error and throws toast when server error returned", async () => {
      const ERROR_MESSAGE = "test";
      await testManager
        .configureContext((context) => {
          context.badgeDao.mockReturn({
            data: null,
            errors: [{ message: ERROR_MESSAGE, extensions: { code: "TEST" } }],
          });
        })
        .execute((context) => context.badgeService.editBadge(existingBadge.badgeId, updatedBadgeParams));

      const storeState = testManager.store.getState();
      expect(storeState.errors[0].message).toBe(ERROR_MESSAGE);
      expect(storeState.toasts[0].message).toBe(ERROR_MESSAGE);
      expect(storeState.toasts[0].type).toBe("DANGER");
    });
  });
});
