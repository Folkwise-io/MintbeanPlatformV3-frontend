import { User } from "./User";

export interface Post {
  id: string;
  userId: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserPost {
  id: string;
  body: string;
  createdAt: string;
}
