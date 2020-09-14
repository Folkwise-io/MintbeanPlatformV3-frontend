import { login, logout } from "../../../src/views/state/actions/authActions";
import { TestManager } from "../TestManager";
import { TEST_EMAIL, TEST_PASSWORD } from "../constants";
import { userFactory } from "../factories/user.factory";

const fakeUser = userFactory.one();

describe("Auth actions", () => {
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
    it("Updates state.user and throws Toast on successful login", async () => {
      await testManager
        // fake a successful login by returning user
        .configureContext((context) => {
          context.authDao.mockReturn({ data: fakeUser });
        })
        .dispatchThunk<User>(login({ email: TEST_EMAIL, password: TEST_PASSWORD }))
        .then((tm) => {
          const results = tm.getResults();

          expect(results[0].user.loadStatus).toBe("LOADING");
          expect(results[0].user.data).toBe(undefined);

          // returns user on success
          const finalState = results.length - 1;
          expect(results[finalState].user.loadStatus).toBe("SUCCESS");
          expect(results[finalState].user.data).toMatchObject(JSON.parse(JSON.stringify(fakeUser)));
          expect(results[finalState].toasts[0].type).toBe("SUCCESS");
        });
    });

    it("Registers error loadStatus for state.user, logs error and throws Toast on failed login, ", async () => {
      const ERROR_CODE = "AMBIGUOUS_ERROR";
      await testManager
        // fake a bad login by forcing errors in dao return
        .configureContext((context) => {
          context.authDao.mockReturn({
            data: null,
            errors: [{ message: "test err", extensions: { code: ERROR_CODE } }],
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
          expect(results[finalState].errors[0].code).toBe(ERROR_CODE);
          expect(results[finalState].errors[0].message).toBe("Login failed.");
          expect(results[finalState].toasts[0].type).toBe("DANGER");
          expect(results[finalState].toasts[0].message).toBe("Login failed.");
        });
    });
  });

  describe("LOGOUT", () => {
    beforeEach(() => {
      testManager = TestManager.build();
    });

    afterEach(() => {
      // Just to be safe!
      testManager.configureContext((context) => {
        context.authDao.clearMockReturns();
      });
    });

    // TODO: test for jwt token cookie removal
    it("Updates state.user to undefined on successful logout", async () => {
      await testManager
        .configureContext((context) => {
          context.authDao.mockReturn({ data: fakeUser });
        })
        // login
        .dispatchThunk<User>(login({ email: TEST_EMAIL, password: TEST_PASSWORD }))
        .then((tm) => {
          // logout
          tm.dispatchThunk<boolean>(logout()).then((tm) => {
            const results = tm.getResults();

            const preLogoutState = results.length - 2;
            expect(results[preLogoutState].user.loadStatus).toBe("SUCCESS");
            expect(results[preLogoutState].user.data).toMatchObject(JSON.parse(JSON.stringify(fakeUser)));

            const finalState = results.length - 1;
            expect(results[finalState].user.loadStatus).toBe("SUCCESS");
            expect(results[finalState].user.data).toBe(undefined);
          });
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
