import { Post } from "../types/Post";
import { Launch } from "../types/Launch";

export interface LoaderItemInner {
  status: string;
  message: string;
}

export interface LoaderItem {
  [key: string]: LoaderItemInner;
}

export type LoaderState = LoaderItem[];

export interface PostsState {
  posts: Post[];
}

export type LaunchesState = Launch[];

export enum ApiDataStates {
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export type MbAction = {
  type: string;
  payload: any;
  api?: boolean;
  status?: ApiDataStates;
  message?: string;
};

export interface StoreState {
  posts: PostsState;
  launches: LaunchesState;
  loader: LoaderItem[];
}
