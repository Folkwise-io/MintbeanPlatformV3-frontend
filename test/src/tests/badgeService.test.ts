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
    // TODO: add error handling for if fetch fails with toast
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
    // TODO: add error hand.ling for if fetch fails with toast
  });
});
