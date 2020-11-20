import { TestManager } from "../TestManager";
import { projectFactory } from "../factories/project.factory";
import { badgeForProjectFactory } from "../factories/badge.factory";

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
  describe("deleteProject()", () => {
    beforeEach(() => {
      testManager = TestManager.build();
    });

    afterEach(() => {
      // Just to be safe!
      testManager.configureContext((context) => {
        context.projectDao.clearMockReturns();
      });
    });

    it("allows deletion of project by id", async () => {
      await testManager
        .configureContext((context) => {
          context.projectDao.mockReturn({ data: true });
        })
        .execute((context) => {
          return context.projectService.deleteProject("someuuid");
        });
      const storeState = testManager.store.getState();
      expect(storeState.errors.length).toBe(0);
      expect(storeState.toasts[0].type).toBe("SUCCESS");
    });
    it("logs error and throws server message toast on error", async () => {
      const SERVER_ERR_MSG = "test";
      await testManager
        .configureContext((context) => {
          context.projectDao.mockReturn({
            data: null,
            errors: [{ message: SERVER_ERR_MSG, extensions: { code: "TEST_UNAUTHORIZED" } }],
          });
        })
        .execute((context) => {
          return context.projectService.deleteProject("someuuid");
        });

      const storeState = testManager.store.getState();
      expect(storeState.errors[0].message).toBe(SERVER_ERR_MSG);
      const lastToast = storeState.toasts.length - 1;
      expect(storeState.toasts[lastToast].type).toBe("DANGER");
    });
  });

  describe("awardBadges()", () => {
    beforeEach(() => {
      testManager = TestManager.build();
    });

    afterEach(() => {
      // Just to be safe!
      testManager.configureContext((context) => {
        context.projectDao.clearMockReturns();
      });
    });
    const existingProject = projectFactory.one();
    const existingBadge = badgeForProjectFactory.one();
    const existingBadgeId = existingBadge.id;
    const existingProjectId = existingProject.id;
    it("returns a project with badges on success", async () => {
      await testManager
        .configureContext((context) => {
          context.projectDao.mockReturn({ data: true });
        })
        .execute((context) => {
          return context.projectService.awardBadges(existingProjectId, [existingBadgeId]);
        });
    });

    it("logs error and throws toast when server error returned", async () => {
      const ERROR_MESSAGE = "test";
      await testManager
        .configureContext((context) => {
          context.projectDao.mockReturn({
            data: null,
            errors: [{ message: ERROR_MESSAGE, extensions: { code: "TEST" } }],
          });
        })
        .execute((context) => context.projectService.awardBadges(existingProjectId, [existingBadgeId]));

      const storeState = testManager.store.getState();
      expect(storeState.errors[0].message).toBe(ERROR_MESSAGE);
      expect(storeState.toasts[0].message).toBe(ERROR_MESSAGE);
      expect(storeState.toasts[0].type).toBe("DANGER");
    });
  });
});
