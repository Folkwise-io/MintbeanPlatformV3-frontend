import { TestManager } from "../TestManager";
import { projectFactory } from "../factories/project.factory";
import { userFactory } from "../factories/user.factory";

// TODO: fix meet factory to allow recursive assocaition nesting
const fakeProject = projectFactory.one();

describe("ProjectService", () => {
  let testManager: TestManager;

  describe("fetchProject()", () => {
    beforeEach(() => {
      testManager = TestManager.build();
    });

    afterEach(() => {
      // Just to be safe!
      testManager.configureContext((context) => {
        context.projectDao.clearMockReturns();
      });
    });
    it("returns a projects on success", async () => {
      await testManager
        .configureContext((context) => {
          context.projectDao.mockReturn({ data: fakeProject });
        })
        .execute((context) => {
          return context.projectService.fetchProject(fakeProject.id).then((result) => {
            expect(result).toMatchObject(fakeProject);
          });
        });
    });
    it("logs error and throws toast on failure", async () => {
      const SERVER_ERR_MESSAGE = "Test msg";
      const FAKE_ERROR = { data: null, errors: [{ message: SERVER_ERR_MESSAGE, extensions: { code: "TEST" } }] };
      await testManager
        .configureContext((context) => {
          context.projectDao.mockReturn(FAKE_ERROR);
        })
        .execute((context) => {
          return context.projectService.fetchProject(fakeProject.id).then((result) => {
            expect(result).toBe(undefined);
          });
        });
      const finalState = testManager.store.getState();
      expect(finalState.errors[0].message).toBe(SERVER_ERR_MESSAGE);
      expect(finalState.toasts[0].type).toBe("DANGER");
    });
    // it("returns an empty array if no meets are in db", async () => {
    //   const tm = testManager.addMeets([]);
    //
    //   await tm.execute((context) => {
    //     return context.meetService.fetchMeets().then((result) => {
    //       expect(result.length).toBe(0);
    //     });
    //   });
    // });
  });
});
