import axios from "axios";
import { API_BASE_URL } from "@/lib/api-base";
import { getAuthToken } from "@/lib/auth";
import { PaginationMeta } from "@/types/pagination";
import { AdminProjectRow, AdminStats, AdminUserRole, AdminUserRow } from "@/types/admin";

const API_URL = `${API_BASE_URL}/admin`;
const instance = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use((config) => {
  const TOKEN = getAuthToken();
  if (TOKEN) {
    config.headers.Authorization = `Bearer ${TOKEN}`;
  }
  return config;
});

export async function getAdminStats(): Promise<AdminStats> {
  const response = await instance.get("/stats");
  return response.data;
}

export async function getAdminUsers({
  pageParam = 1,
  limit = 10,
  role,
}: {
  pageParam?: number;
  limit?: number;
  role?: AdminUserRole;
}): Promise<{ users: AdminUserRow[]; pagination: PaginationMeta }> {
  const response = await instance.get("/users", {
    params: { pageParam, limit, role },
  });
  return response.data;
}

export async function getAdminProjects({
  pageParam = 1,
  limit = 10,
}: {
  pageParam?: number;
  limit?: number;
}): Promise<{ projects: AdminProjectRow[]; pagination: PaginationMeta }> {
  const response = await instance.get("/projects", {
    params: { pageParam, limit },
  });
  return response.data;
}

export async function deleteAdminUser(userId: string): Promise<{ id: string }> {
  const response = await instance.delete(`/users/${userId}`);
  return response.data;
}
