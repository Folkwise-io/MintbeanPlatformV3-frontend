import { login, logout, me, register } from "../../../src/views/state/actions/authActions";
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
    it("updates state.user and throws Toast on successful login", async () => {
      await testManager
        // fake a successful login by returning user
        .configureContext((context) => {
          context.authDao.mockReturn({ data: fakeUser });
        })
        .dispatchThunk<User>(login({ email: TEST_EMAIL, password: TEST_PASSWORD }))
        .then((tm: TestManager) => {
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

    it("registers error loadStatus for state.user, logs error and throws Toast on failed login, ", async () => {
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
        .then((tm: TestManager) => {
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
    it("updates state.user to undefined on successful logout", async () => {
      await testManager
        .configureContext((context) => {
          context.authDao.mockReturn({ data: fakeUser });
        })
        // login
        .dispatchThunk<User>(login({ email: TEST_EMAIL, password: TEST_PASSWORD }))
        .then((tm: TestManager) => {
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

  describe("ME", () => {
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
    it("updates state.user to current user on success", async () => {
      await testManager
        .configureContext((context) => {
          // mock successful response
          context.authDao.mockReturn({ data: fakeUser });
        })
        // login
        .dispatchThunk<User>(me())
        .then((tm: TestManager) => {
          const results = tm.getResults();

          expect(results[0].user.loadStatus).toBe("LOADING");
          expect(results[0].user.data).toBe(undefined);

          const finalState = results.length - 1;
          expect(results[finalState].user.loadStatus).toBe("SUCCESS");
          expect(results[finalState].user.data).toMatchObject(JSON.parse(JSON.stringify(fakeUser)));
        });
    });

    /* TODO: refactor error catching logic in testauthdao */
    //   it("keeps state.user undefined and does NOT log error when error response", async () => {
    //     const ERROR_CODE = "UNAUTHENTICATED";
    //     await testManager
    //       .configureContext((context) => {
    //         // mock successful response
    //         context.authDao.mockReturn({ message: "force fail", extensions: { code: ERROR_CODE } }]);
    //       })
    //       .dispatchThunk<User>(me())
    //       .then((tm: TestManager) => {
    //         const results = tm.getResults();
    //         console.log(results[1]);
    //         expect(results[0].user.loadStatus).toBe("LOADING");
    //         expect(results[0].user.data).toBe(undefined);
    //
    //         const finalState = results.length - 1;
    //         expect(results[finalState].user.loadStatus).toBe("SUCCESS");
    //         expect(results[finalState].user.data).toBe(undefined);
    //         // Expect no errors or toast. This is a silent operation just checking if user has valid JWT token already
    //         expect(results[finalState].errors.length).toBe(0);
    //         expect(results[finalState].toasts.length).toBe(0);
    //       });
    //   });
  });

  describe("REGISTER", () => {
    beforeEach(() => {
      testManager = TestManager.build();
    });

    afterEach(() => {
      // Just to be safe!
      testManager.configureContext((context) => {
        context.authDao.clearMockReturns();
      });
    });

    const newUserParams: RegisterParams = {
      firstName: "Amy",
      lastName: "Web",
      username: "amyweb123",
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      passwordConfirmation: TEST_PASSWORD,
    };
    const expectedNewUser: User = {
      id: "fdsajkhfkjhdf",
      firstName: newUserParams.firstName,
      lastName: newUserParams.lastName,
      username: newUserParams.username,
      email: newUserParams.email,
      createdAt: new Date(),
    };

    // TODO: test for jwt token cookie assignment
    it("updates state.user to new user on successful signup", async () => {
      await testManager
        .configureContext((context) => {
          context.authDao.mockReturn({ data: expectedNewUser });
        })
        .dispatchThunk<User>(register(newUserParams))
        .then((tm: TestManager) => {
          const results = tm.getResults();

          expect(results[0].user.loadStatus).toBe("LOADING");
          expect(results[0].user.data).toBe(undefined);

          // returns user on success
          const finalState = results.length - 1;
          expect(results[finalState].user.loadStatus).toBe("SUCCESS");
          expect(results[finalState].user.data).toMatchObject(JSON.parse(JSON.stringify(expectedNewUser)));
        });
    });

    it("logs error and throws toast when logged-in user attempts to register", async () => {
      await testManager
        .configureContext((context) => {
          context.authDao.mockReturn({ data: expectedNewUser });
        })
        .dispatchThunk(login({ email: TEST_EMAIL, password: TEST_PASSWORD }))
        .then((tm: TestManager) => {
          tm.dispatchThunk(register(newUserParams)).then((tm: TestManager) => {
            const results = tm.getResults();

            expect(results[0].user.loadStatus).toBe("LOADING");
            expect(results[0].user.data).toBe(undefined);

            // expect current user to remain logged in as succes, but logs error and throws toast
            const finalState = results.length - 1;
            const expectedErrorMsg = "Sorry, you can't create an account because you're already logged in!";

            expect(results[finalState].user.loadStatus).toBe("SUCCESS");
            expect(results[finalState].user.data).toMatchObject(JSON.parse(JSON.stringify(expectedNewUser)));
            const allToasts = results[finalState].toasts;
            const lastToast = allToasts[allToasts.length - 1];
            expect(lastToast.type).toBe("DANGER");
            expect(lastToast.message).toBe(expectedErrorMsg);
            expect(results[finalState].errors[0].message).toBe(expectedErrorMsg);
          });
        });
    });
  });
});
