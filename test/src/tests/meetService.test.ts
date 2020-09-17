// import { fetchMeets } from "../../../src/services/meetService";
import { TestManager } from "../TestManager";
import { meetFactory } from "../factories/meet.factory";

const fakeMeets = meetFactory.bulk(10);

describe("Meets", () => {
  let testManager: TestManager;

  describe("MeetService > fetchMeets()", () => {
    beforeEach(() => {
      testManager = TestManager.build();
    });

    afterEach(() => {
      // Just to be safe!
      testManager.configureContext((context) => {
        context.authDao.clearMockReturns();
      });
    });
    it("returns a list of meets on success", async () => {
      const tm = testManager.addMeets(fakeMeets);

      await tm.execute((context) => {
        return context.meetService.fetchMeets().then((result) => {
          expect(result.length).toBe(10);
        });
      });
    });
    it("returns an empty array if no meets are in db", async () => {
      const tm = testManager.addMeets([]);

      await tm.execute((context) => {
        return context.meetService.fetchMeets().then((result) => {
          expect(result.length).toBe(0);
        });
      });
    });
    it("logs an error and throws toast if fetch fails", async () => {
      const FAKE_ERROR = { data: null, errors: [{ message: "BAD", extensions: { code: "TEST" } }] };
      await testManager
        .configureContext((context) => {
          context.meetDao.mockReturn(FAKE_ERROR);
        })
        .execute((context) => {
          return context.meetService.fetchMeets().then((result) => {
            expect(result.length).toBe(0);
            const errors = context.meetDao.getErrors();
            expect(errors[0]).toMatchObject(FAKE_ERROR);
          });
        });
    });
  });
});
