import { type User } from "./user";

export interface Task {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  authorId: number;
  assigneeId: number;
  author: User;
  assignee: User;
}
