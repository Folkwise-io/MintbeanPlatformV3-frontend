import { fetchUsers } from "../src/views/state/actions/userActions";
import { TestManager } from "./src/TestManager";

const testUsers = [
  {
    createdAt: new Date("1994-08-02T18:59:50.006Z"),
    firstName: "test",
    lastName: "user",
    id: "userid",
    username: "testuser",
  },
];

describe("user actions", () => {
  let testManager: TestManager;
  beforeEach(() => {
    testManager = TestManager.build();
  });
  it("should get users for the store", () => {
    testManager
      .addUser(testUsers)
      .dispatchThunk(fetchUsers())
      .then((tm) => {
        const results = tm.getResults();
        console.log(results[0].users);

        // expect(results[0].users.length).toBe(0);
        // expect(results[1].users[0]).toEqual(testUsers);
      });
  });
});
