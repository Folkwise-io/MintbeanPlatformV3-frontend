// import { initialState, postsReducer } from "../src/state/reducers/post";
// import { CREATE_POST /*, UPDATE_POST, PostActionTypes*/ } from "../src/state/actions/postActionsTypes";
// import { Action } from "redux";

import { fetchUsers } from "../src/views/state/actions/userActions";
import { TestManager } from "./src/TestManager";

describe("user actions", () => {
  let testManager: TestManager;
  beforeEach(() => {
    testManager = TestManager.build();
  });
  it("should get users from store", () => {
    testManager
      .subscribe()
      .dispatch(fetchUsers())
      .then((tm) => tm.getResults());
  });
});
