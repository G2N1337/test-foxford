import { api } from "./http";

export const createTask = (title: string, description: string) =>
  api.post("/tasks", { title, description });

export const getTasks = () => api.get("/tasks");

export const updateTask = (id: number, data: { title: string; description: string }) =>
  api.patch(`/tasks/${id}`, data);

export const deleteTask = (id: number) =>
  api.delete(`/tasks/${id}`);
