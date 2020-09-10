import { login } from "../../../src/views/state/actions/authActions";
import { TestManager } from "../TestManager";
import { TEST_EMAIL, TEST_PASSWORD } from "../constants";
import { userFactory } from "../factories/user.factory";

const fakeUser = userFactory.one();

describe("Auth actions", () => {
  let testManager: TestManager;
  beforeEach(() => {
    testManager = TestManager.build();
  });

  afterEach(() => {
    // This may be unecessary since run testManager.build() before each
    // Just to be safe!
    testManager.configureContext((context) => {
      context.authDao.clearMockReturns();
    });
  });

  it("Returns user on login with good credentials", async () => {
    await testManager
      // fake a successful login by returning user
      .configureContext((context) => {
        context.authDao.mockReturn([fakeUser]);
      })
      .dispatchThunk(login({ email: TEST_EMAIL, password: TEST_PASSWORD }))
      .then((tm) => {
        const results = tm.getResults();

        expect(results[0].user.loadStatus).toBe("LOADING");
        expect(results[0].user.data).toBe(undefined);

        // returns user on success
        const finalState = results.length - 1;
        expect(results[finalState].user.loadStatus).toBe("SUCCESS");
        expect(results[finalState].user.data).toMatchObject(fakeUser);
        // done();
      });
  });

  it("Registers loadStatus 'ERROR', undefined user on login with bad credentials, ", async () => {
    await testManager
      // fake a bad login by skipping config of context.authDao context
      .dispatchThunk(login({ email: TEST_EMAIL, password: TEST_PASSWORD }))
      .then((tm) => {
        const results = tm.getResults();
        console.log(results);
        expect(results[0].user.loadStatus).toBe("LOADING");
        expect(results[0].user.data).toBe(undefined);

        const finalState = results.length - 1;
        expect(results[finalState].user.loadStatus).toBe("ERROR");
        expect(results[finalState].user.data).toBe(undefined);
      });
  });
});
