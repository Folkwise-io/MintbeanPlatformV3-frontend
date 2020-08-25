import { Post } from "../types/Post";

export interface PostsState {
  posts: Post[];
}

export interface StoreState {
  posts: PostsState;
}
