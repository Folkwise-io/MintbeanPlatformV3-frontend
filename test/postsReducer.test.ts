import { initialState, postsReducer } from "../src/state/reducers/post";
import { CREATE_POST /*, UPDATE_POST, PostActionTypes*/ } from "../src/state/actions/postActionsTypes";
// import { Action } from "redux";
import { Post } from "../src/types/Post";

const TEST_USERNAME: string = "test_user";
const TEST_BODY: string = "test body";

describe("postsReducer", () => {
  describe("CREATE_POST", () => {
    it("should add post to store.posts.posts", () => {
      const testPost: Post = { id: 1, username: TEST_USERNAME, body: TEST_BODY, createdAt: new Date() };
      const state = postsReducer(initialState, {
        type: CREATE_POST,
        payload: testPost,
      });
      expect(state.posts.includes(testPost)).toBe(true);
    });
  });

  // it("should update the count in the state when SET_COUNT action", () => {
  //   const payload = 5;
  //   const action = { type: SET_COUNT, payload } as Action;
  //   const modifiedState = postsReducer(initialState, action);
  //   expect(modifiedState.count).toEqual(payload);
  // });
  //
  // it("should reset the count on RESET_COUNTER action", () => {
  //   const modifiedState = {
  //     ...initialState,
  //     count: 666,
  //   };
  //   const action = { type: RESET_COUNTER, payload: null } as Action;
  //   const newState = postsReducer(modifiedState, action);
  //   expect(newState.count).toEqual(0);
  // });
});
