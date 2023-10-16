import { User } from "./user.model";

export interface Post {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    userId: number;
    user: User;
  }