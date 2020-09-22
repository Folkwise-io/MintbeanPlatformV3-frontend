import { TestManager } from "../TestManager";
import { projectFactory } from "../factories/project.factory";
// import { userFactory } from "../factories/user.factory";

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
    it("returns a project on success", async () => {
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
  });
  describe("createProject()", () => {
    beforeEach(() => {
      testManager = TestManager.build();
    });

    afterEach(() => {
      // Just to be safe!
      testManager.configureContext((context) => {
        context.projectDao.clearMockReturns();
      });
    });

    const newProjectParams: CreateProjectParams = {
      title: fakeProject.title,
      userId: fakeProject.user.id,
      meetId: fakeProject.meet.id,
      sourceCodeUrl: fakeProject.sourceCodeUrl,
      liveUrl: fakeProject.liveUrl,
      cloudinaryPublicIds: fakeProject.mediaAssets.map((ma) => ma.cloudinaryPublicId),
    };

    it("returns new project and throws successs toast on success", async () => {
      await testManager
        .configureContext((context) => {
          context.projectDao.mockReturn({ data: fakeProject });
        })
        .execute((context) => {
          return context.projectService.createProject(newProjectParams).then((result) => {
            expect(result).toMatchObject(fakeProject);
          });
        });
      const finalStoreState = testManager.store.getState();
      expect(finalStoreState.toasts[0].type).toBe("SUCCESS");
    });
    it("logs error and throws toast on failure", async () => {
      const SERVER_ERR_MESSAGE = "Test msg";
      const FAKE_ERROR = { data: null, errors: [{ message: SERVER_ERR_MESSAGE, extensions: { code: "TEST" } }] };
      await testManager
        .configureContext((context) => {
          context.projectDao.mockReturn(FAKE_ERROR);
        })
        .execute((context) => {
          return context.projectService.createProject(newProjectParams).then((result) => {
            expect(result).toBe(undefined);
          });
        });
      const finalState = testManager.store.getState();
      expect(finalState.errors[0].message).toBe(SERVER_ERR_MESSAGE);
      expect(finalState.toasts[0].type).toBe("DANGER");
    });
  });
});
