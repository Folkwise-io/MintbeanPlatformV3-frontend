import { PostActionTypes, CREATE_POST, UPDATE_POST } from "../actions/postActionsTypes";
import { PostsState } from "../types";
import { Post } from "../../types/Post";

const initialState: PostsState = {
  posts: [],
};

export function postsReducer(state: PostsState = initialState, action: PostActionTypes): PostsState {
  let updatedPosts: Post[]; // to satisfy "no-case-declarations" rule

  switch (action.type) {
    case CREATE_POST:
      return {
        posts: [...state.posts, action.payload],
      };
    case UPDATE_POST:
      updatedPosts = state.posts.map((b) => {
        if (b.id === action.id) {
          return action.payload;
        }
        return b;
      });

      return {
        posts: updatedPosts,
      };
    default:
      return state;
  }
}
