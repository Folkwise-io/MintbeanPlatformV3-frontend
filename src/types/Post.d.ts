export interface Post {
  id: number;
  body: string;
  username: string;
  createdAt: Date;
}
export interface PostCreateInput {
  body: string;
  username: string;
}

// export interface PostsState {
//   data: Post[];
// }
//
// export const CREATE_POST_REQUEST = "@post/CREATE_POST_REQUEST";
//
// interface CreatePostRequest {
//   type: typeof CREATE_POST_REQUEST;
//   payload: { post: Post };
// }
//
// export type PostActionsTypes = CreatePostRequest;
