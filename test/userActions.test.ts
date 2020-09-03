// import { initialState, postsReducer } from "../src/state/reducers/post";
// import { CREATE_POST /*, UPDATE_POST, PostActionTypes*/ } from "../src/state/actions/postActionsTypes";
// import { Action } from "redux";

import { fetchUsers } from "../src/views/state/actions/userActions";
import { configureStore } from "../src/views/state/configureStore";
import { testContextBuilder } from "./testContextBuilder";

describe("user actions", () => {
  it("should get users from store", () => {
    // TODO: context builder
    const store = configureStore(testContextBuilder());
    store.dispatch(fetchUsers());

    // const testPost: Post = { id: 1, username: TEST_USERNAME, body: TEST_BODY, createdAt: new Date() };
    // const state = postsReducer(initialState, {
    //   type: CREATE_POST,
    //   payload: testPost,
    // });
    // expect(state.posts.includes(testPost)).toBe(true);
  });
});
