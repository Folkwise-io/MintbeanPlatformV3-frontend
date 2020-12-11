import { TestManager } from "../TestManager";
import { meetFactory } from "../factories/meet.factory";

const fakeMeets = meetFactory.bulk(6);

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
          if (!result) throw new Error("Expected result");
          expect(result.length).toBe(6);
        });
      });
    });
    it("returns an empty array if no meets are in db", async () => {
      const tm = testManager.addMeets([]);

      await tm.execute((context) => {
        return context.meetService.fetchMeets().then((result) => {
          if (!result) throw new Error("Expected result");
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
  describe("editMeet()", () => {
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
    const existingMeet = meetFactory.one();
    const NEW_TITLE = "New title";
    const updatedMeetParams = {
      meetType: existingMeet.meetType,
      title: NEW_TITLE,
      description: existingMeet.description,
      detailedDescription: existingMeet.detailedDescription,
      instructions: existingMeet.instructions,
      registerLink: existingMeet.registerLink,
      coverImageUrl: existingMeet.coverImageUrl,
      startTime: existingMeet.startTime,
      endTime: existingMeet.endTime,
      region: existingMeet.region,
    };
    it("returns the edited meet on success", async () => {
      await testManager
        // add existing meet
        .addMeets([existingMeet])
        .execute((context) => {
          return context.meetService.editMeet(existingMeet.id, updatedMeetParams).then((result) => {
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
          context.meetDao.mockReturn({
            data: null,
            errors: [{ message: ERROR_MESSAGE, extensions: { code: "TEST" } }],
          });
        })
        .execute((context) => context.meetService.editMeet(existingMeet.id, updatedMeetParams));

      const storeState = await testManager.store.getState();
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
            expect(result).toBe(undefined);
          });
        });

      const storeState = testManager.store.getState();
      expect(storeState.errors).toBeTruthy();
      expect(storeState.toasts[0].type).toBe("DANGER");
    });
  });
  describe("deleteMeet()", () => {
    beforeEach(() => {
      testManager = TestManager.build();
    });

    afterEach(() => {
      // Just to be safe!
      testManager.configureContext((context) => {
        context.meetDao.clearMockReturns();
      });
    });

    it("allows admin to delete meet by id", async () => {
      await testManager
        .configureContext((context) => {
          context.meetDao.mockReturn({ data: true });
        })
        .execute((context) => {
          return context.meetService.deleteMeet("someuuid");
        });
      const storeState = testManager.store.getState();
      expect(storeState.errors.length).toBe(0);
      expect(storeState.toasts[0].type).toBe("SUCCESS");
    });
    it("logs error and throws server message toast on error", async () => {
      const SERVER_ERR_MSG = "test";
      await testManager
        .configureContext((context) => {
          context.meetDao.mockReturn({
            data: null,
            errors: [{ message: SERVER_ERR_MSG, extensions: { code: "TEST_UNAUTHORIZED" } }],
          });
        })
        .execute((context) => {
          return context.meetService.deleteMeet("someuuid");
        });

      const storeState = testManager.store.getState();
      expect(storeState.errors[0].message).toBe(SERVER_ERR_MSG);
      const lastToast = storeState.toasts.length - 1;
      expect(storeState.toasts[lastToast].type).toBe("DANGER");
    });
  });
  describe("registerForMeet()", () => {
    beforeEach(() => {
      testManager = TestManager.build();
    });

    afterEach(() => {
      // Just to be safe!
      testManager.configureContext((context) => {
        context.meetDao.clearMockReturns();
      });
    });

    it("allows user to register for meet", async () => {
      await testManager
        .configureContext((context) => {
          context.meetDao.mockReturn({ data: true });
        })
        .execute((context) => {
          return context.meetService.registerForMeet("someuuid");
        });
      const storeState = testManager.store.getState();
      expect(storeState.errors.length).toBe(0);
      expect(storeState.toasts[0].type).toBe("SUCCESS");
    });
    it("logs error and throws server message toast on error", async () => {
      const SERVER_ERR_MSG = "test";
      await testManager
        .configureContext((context) => {
          context.meetDao.mockReturn({
            data: null,
            errors: [{ message: SERVER_ERR_MSG, extensions: { code: "TEST_UNAUTHORIZED" } }],
          });
        })
        .execute((context) => {
          return context.meetService.registerForMeet("someuuid");
        });

      const storeState = testManager.store.getState();
      expect(storeState.errors[0].message).toBe(SERVER_ERR_MSG);
      const lastToast = storeState.toasts.length - 1;
      expect(storeState.toasts[lastToast].type).toBe("DANGER");
    });
  });
});
