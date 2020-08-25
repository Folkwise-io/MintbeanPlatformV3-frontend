import { Post } from "../../types/Post";

export const CREATE_POST = "CREATE_POST";

interface CreatePostAction {
  type: typeof CREATE_POST;
  payload: Post;
}

export const UPDATE_POST = "UPDATE_POST";

interface UpdatePostAction {
  type: typeof UPDATE_POST;
  id: number;
  payload: Post;
}

export type PostActionTypes = CreatePostAction | UpdatePostAction;
