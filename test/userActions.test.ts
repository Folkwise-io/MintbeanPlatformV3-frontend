import { fetchUsers } from "../src/views/state/actions/userActions";
import { TestManager } from "./src/TestManager";

const testUser = {
  createdAt: "1994-08-02T18:59:50.006Z",
  firstName: "test",
  lastName: "user",
  id: "userid",
  username: "testuser",
};

describe("user actions", () => {
  let testManager: TestManager;
  beforeEach(() => {
    testManager = TestManager.build();
  });
  it("should get users for the store", () => {
    testManager
      .addUser(testUser)
      .dispatch(fetchUsers())
      .then((tm) => {
        const results = tm.getResults();
        expect(results[0].users.length).toBe(0);
        expect(results[0].loader[0]).toEqual({ FETCH_USERS: { status: "LOADING", message: "Loading..." } });
        expect(results[1].users[0]).toEqual(testUser);
        expect(results[1].loader[0]).toEqual({ FETCH_USERS: { status: "SUCCESS", message: "Loading..." } });
      });
  });
});
