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

export enum ApiDataStates {
  Loading = "LOADING",
  Success = "SUCCESS",
  Error = "ERROR",
}

export type ApiAction = {
  api: boolean;
  state: ApiDataStates;
};
