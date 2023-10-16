import { Post } from "./post.model";
import { User } from "./user.model";

export interface Comment {
    id: number;
    content: string;
    createdAt: Date;
    postId: number;
    post: Post;
    user: User;
  }