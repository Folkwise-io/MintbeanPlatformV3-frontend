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

  it("behaves as expected on successful login", () => {
    let results: any;
    testManager
      // fake a successful login by returning user
      .configureContext((context) => {
        context.authDao.mockReturn([fakeUser]);
      })
      .dispatchThunk(login({ email: TEST_EMAIL, password: TEST_PASSWORD }))
      .then((tm) => {
        results = tm.getResults();
        console.log(results);
        console.log(results[0]);
        console.log(results[1]);
        console.log(results[2]);

        expect(results[0].user.loadingState).toBe("LOADING");
        expect(results[0].user.data).toBe(undefined); // LOADING

        // returns user on success
        expect(results[results.length - 1].user.loadingState).toBe("SUCCESS");
        expect(results[results.length - 1].user.data).toMatchObject(fakeUser); // SUCCES
        console.log({ end: results[results.length - 1].user.data });
      });
  });
});
