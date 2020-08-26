import { Post } from "../types/Post";
import { Launch } from "../types/Launch";

export interface PostsState {
  posts: Post[];
}

export type LaunchesState = Launch[];

export interface StoreState {
  posts: PostsState;
  launches: LaunchesState;
}
