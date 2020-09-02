import { Post } from "../types/Post";
import { gqlApiService } from "./utils";

interface PostsByUser {
  posts: Post[];
}
interface PostsByUsernameResponseRaw {
  user: PostsByUser;
}

const fetchPostsByUsername = (username: string): Promise<Post[]> => {
  const query = `
    query getPosts {
      user(username: "${username}") {
        posts {
          userId
          body
          createdAt
          updatedAt
        }
      }
    }
  `;
  return gqlApiService<PostsByUsernameResponseRaw>("http://localhost:4000/graphql", query).then((result) => {
    if (!(result.user && result.user.posts)) {
      return [];
    }
    return result.user.posts;
  });
};

export { fetchPostsByUsername };
