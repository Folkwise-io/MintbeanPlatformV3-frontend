import { TestManager } from "../TestManager";
import { meetFactory } from "../factories/meet.factory";
// import { userFactory } from "../factories/user.factory";

const fakeMeets = meetFactory.bulk(10);

describe("MeetService", () => {
  let testManager: TestManager;

  describe("fetchMeets()", () => {
    beforeEach(() => {
      testManager = TestManager.build();
    });

    afterEach(() => {
      // Just to be safe!
      testManager.configureContext((context) => {
        context.meetDao.clearMockReturns();
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
      const ERR_MSG = "Test";
      const FAKE_ERROR = { data: null, errors: [{ message: ERR_MSG, extensions: { code: "TEST" } }] };
      await testManager
        .configureContext((context) => {
          context.meetDao.mockReturn(FAKE_ERROR);
        })
        .execute((context) => context.meetService.fetchMeets());
      const storeState = testManager.store.getState();
      expect(storeState.errors[0].message).toBe(ERR_MSG);
      // const errors = context.meetDao.getErrors();
      // expect(errors[0]).toMatchObject(FAKE_ERROR);
    });
  });
  describe("createMeet()", () => {
    beforeEach(() => {
      testManager = TestManager.build();
    });

    afterEach(() => {
      // Just to be safe!
      testManager.configureContext((context) => {
        context.meetDao.clearMockReturns();
      });
    });

    // TODO: implement cookie header mocking for authorization tests
    // it("only permits admins to create meets", async () => {
    //   const user = userFactory.one();
    //    ...
    // });
    const newMeet = meetFactory.one();
    const validMeetParams = {
      meetType: newMeet.meetType,
      title: newMeet.title,
      description: newMeet.description,
      instructions: newMeet.instructions,
      registerLink: newMeet.registerLink,
      coverImageUrl: newMeet.coverImageUrl,
      startTime: newMeet.startTime,
      endTime: newMeet.endTime,
      region: newMeet.region,
    };
    it("returns the created meet on success", async () => {
      await testManager
        .configureContext((context) => {
          context.meetDao.mockReturn({ data: newMeet });
        })
        .execute((context) => {
          return context.meetService.createMeet(validMeetParams).then((result) => {
            expect(result).toMatchObject(newMeet);
          });
        });
    });
    it("logs error and throws toast when server error returned", async () => {
      const ERROR_MESSAGE = "test";
      await testManager
        .configureContext((context) => {
          context.meetDao.mockReturn({
            data: null,
            errors: [{ message: ERROR_MESSAGE, extensions: { code: "TEST" } }],
          });
        })
        .execute((context) => context.meetService.createMeet(validMeetParams));

      const storeState = testManager.store.getState();
      expect(storeState.errors[0].message).toBe(ERROR_MESSAGE);
      expect(storeState.toasts[0].message).toBe(ERROR_MESSAGE);
      expect(storeState.toasts[0].type).toBe("DANGER");
    });
  });
  describe("fetchMeet()", () => {
    beforeEach(() => {
      testManager = TestManager.build();
    });

    afterEach(() => {
      // Just to be safe!
      testManager.configureContext((context) => {
        context.meetDao.clearMockReturns();
      });
    });

    const meet = meetFactory.one();
    const id = meet.id;

    it("returns a meet by id", async () => {
      await testManager
        .configureContext((context) => {
          context.meetDao.mockReturn({ data: meet });
        })
        .execute((context) => {
          return context.meetService.fetchMeet(id).then((result) => {
            console.log(result);
            expect(result).toMatchObject(meet);
          });
        });

      const storeState = testManager.store.getState();
      expect(storeState.errors.length).toBe(0);
    });
    it("logs error and throws toast if meet not found", async () => {
      await testManager
        .configureContext((context) => {
          context.meetDao.mockReturn({
            data: null,
            errors: [
              {
                message: "forced error",
                extensions: { code: "TEST_ERR" },
              },
            ],
          });
        })
        .execute((context) => {
          return context.meetService.fetchMeet("thiswontwork").then((result) => {
            console.log({ result });
            expect(result).toBe(undefined);
          });
        });

      const storeState = testManager.store.getState();
      expect(storeState.errors).toBeTruthy();
      expect(storeState.toasts[0].type).toBe("DANGER");
    });
  });
});
