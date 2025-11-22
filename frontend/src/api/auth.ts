import { api } from "./http";

export const login = (email: string, password: string) =>
  api.post("/auth/login", { email, password });

export const registerUser = (email: string, password: string) =>
  api.post("/auth/register", { email, password });
