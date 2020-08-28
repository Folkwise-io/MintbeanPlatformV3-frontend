import { fetchPostsByUsername as fetchPostsByUsernameDao } from "../daos/PostDao";
import { Post } from "../types/Post";

export const fetchPostsByUsername = (username: string): Promise<Post[]> => {
  return fetchPostsByUsernameDao(username);
};
