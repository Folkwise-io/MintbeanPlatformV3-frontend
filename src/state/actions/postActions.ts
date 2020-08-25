import { PostCreateInput, Post } from "../../types/Post";
import { CREATE_POST, UPDATE_POST, PostActionTypes } from "./postActionsTypes";

export function createPost(post: PostCreateInput): PostActionTypes {
  const now: Date = new Date();
  const timestamp: number = Math.round(now.getTime() / 1000); // generate 'unique' id for now
  return {
    type: CREATE_POST,
    payload: { ...post, createdAt: now, id: timestamp },
  };
}

export function updatePost(id: number, payload: Post): PostActionTypes {
  return {
    type: UPDATE_POST,
    id,
    payload,
  };
}
