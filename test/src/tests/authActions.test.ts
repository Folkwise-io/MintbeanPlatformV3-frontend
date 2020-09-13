import { login } from "../../../src/views/state/actions/authActions";
import { TestManager } from "../TestManager";
import { TEST_EMAIL, TEST_PASSWORD } from "../constants";
import { userFactory } from "../factories/user.factory";

const fakeUser = userFactory.one();

describe.skip("Auth actions", () => {
  let testManager: TestManager;

  describe("LOGIN", () => {
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

    // TODO: test for jwt token cookie assignment
    it("Returns user on login with good credentials", async () => {
      await testManager
        // fake a successful login by returning user
        .configureContext((context) => {
          context.authDao.mockReturn({ data: fakeUser });
        })
        .dispatchThunk<User>(login({ email: TEST_EMAIL, password: TEST_PASSWORD }))
        .then((tm) => {
          const results = tm.getResults();

          console.log(tm.getResults());

          expect(results[0].user.loadStatus).toBe("LOADING");
          expect(results[0].user.data).toBe(undefined);

          // returns user on success
          const finalState = results.length - 1;
          expect(results[finalState].user.loadStatus).toBe("SUCCESS");
          expect(results[finalState].user.data).toMatchObject(fakeUser);
        });
    });

    it("Registers loadStatus 'ERROR', user remains undefined on login with bad credentials, ", async () => {
      await testManager
        // fake a bad login by forcing errors in dao return
        .configureContext((context) => {
          context.authDao.mockReturn({
            data: null,
            errors: [{ message: "test err", extensions: { code: "UNAUTHORIZED" } }],
          });
        })
        .dispatchThunk<User>(login({ email: TEST_EMAIL, password: TEST_PASSWORD }))
        .then((tm) => {
          const results = tm.getResults();

          expect(results[0].user.loadStatus).toBe("LOADING");
          expect(results[0].user.data).toBe(undefined);

          const finalState = results.length - 1;
          expect(results[finalState].user.loadStatus).toBe("ERROR");
          expect(results[finalState].user.data).toBe(undefined);
        });
    });
  });
  // COMING SOON

  // describe("SIGNUP", () => {
  //   beforeEach(() => {
  //     testManager = TestManager.build();
  //   });
  //
  //   afterEach(() => {
  //     // This may be unecessary since run testManager.build() before each
  //     // Just to be safe!
  //     testManager.configureContext((context) => {
  //       context.authDao.clearMockReturns();
  //     });
  //   });

  // TODO: test for jwt token cookie assignment
  // it("Sets new user to redux state on signup", async () => {
  //   const newUserParams: SignupInput = {
  //     firstName: "Amy",
  //     lastName: "Web",
  //     username: "amyweb123",
  //     email: TEST_EMAIL,
  //     password: TEST_PASSWORD,
  //     passwordConfirm: TEST_PASSWORD,
  //   };
  //
  //   const expectedNewUser: User = {
  //     id: "fdsajkhfkjhdf",
  //     firstName: newUserParams.firstName,
  //     lastName: newUserParams.lastName,
  //     username: newUserParams.username,
  //     email: newUserParams.email,
  //     createdAt: new Date(),
  //   };
  //
  //   await testManager.configureContext((context) => {
  //     context.authDao.mockReturn([{ data: expectedNewUser }]);
  //   });
  // .dispatchThunk(signup(newUserParams))
  // .then((tm) => {
  //   const results = tm.getResults();
  //
  //   expect(results[0].user.loadStatus).toBe("LOADING");
  //   expect(results[0].user.data).toBe(undefined);
  //
  //   // returns user on success
  //   const finalState = results.length - 1;
  //   expect(results[finalState].user.loadStatus).toBe("SUCCESS");
  //   expect(results[finalState].user.data).toMatchObject(expectedNewUser);
  // });
  // });

  // it("Does not allow signup for logged-in user", async () => {
  //   const newUserParams: SignupInput = {
  //     firstName: "Amy",
  //     lastName: "Web",
  //     username: "amyweb123",
  //     email: TEST_EMAIL,
  //     password: TEST_PASSWORD,
  //     passwordConfirm: TEST_PASSWORD,
  //   };
  //
  //   const user = userFactory.one();
  //
  //   await testManager
  //     .configureContext((context) => {
  //       context.authDao.mockReturn([{ data: user }]);
  //     })
  //     .dispatchThunk(login({ email: TEST_EMAIL, password: TEST_PASSWORD }))
  //     .dispatchThunk(signup(newUserParams))
  //     .then((tm) => {
  //       const results = tm.getResults();
  //       console.log({ results });
  //
  //       expect(results[0].user.loadStatus).toBe("LOADING");
  //       expect(results[0].user.data).toBe(undefined);
  //
  //       // returns user on success
  //       const finalState = results.length - 1;
  //       expect(results[finalState].user.loadStatus).toBe("ERROR");
  //       expect(results[finalState].user.data).toMatchObject(user);
  //     });
  // });
  // });
});
