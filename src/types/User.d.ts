import { UserPost } from "./Post";

export type User = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  posts: UserPost[];
};
