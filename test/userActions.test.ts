// import { initialState, postsReducer } from "../src/state/reducers/post";
// import { CREATE_POST /*, UPDATE_POST, PostActionTypes*/ } from "../src/state/actions/postActionsTypes";
// import { Action } from "redux";

import { fetchUsers } from "../src/state/actions/userActions";
import { store } from "../src/state/store";

describe("user actions", () => {
  it("should get users from store", () => {
    store.dispatch(fetchUsers());

    // const testPost: Post = { id: 1, username: TEST_USERNAME, body: TEST_BODY, createdAt: new Date() };
    // const state = postsReducer(initialState, {
    //   type: CREATE_POST,
    //   payload: testPost,
    // });
    // expect(state.posts.includes(testPost)).toBe(true);
  });
});
