import { fetchUsers } from "../../../src/views/state/actions/userActions";
import { TestManager } from "../TestManager";
import { userFactory } from "../factories/user.factory";

const testUsers = userFactory.bulk(5);

describe("user actions", () => {
  let testManager: TestManager;
  beforeEach(() => {
    testManager = TestManager.build();
  });

  it("Should get users for the store", async () => {
    await testManager
      .addUsers(testUsers)
      .dispatchThunk<User[]>(fetchUsers())
      .then((tm) => {
        const results = tm.getResults();
        expect(results[0].users.data.length).toBe(0);
        expect(results[0].users.loadStatus).toBe("LOADING");

        const finalState = results.length - 1;
        expect(results[finalState].users.data).toEqual(JSON.parse(JSON.stringify(testUsers)));
        expect(results[finalState].users.loadStatus).toBe("SUCCESS");

        expect(results[finalState].errors.length).toBe(0);
      });
  });
});

// Id title Discription
