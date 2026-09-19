import axios from "axios";
import { API_BASE_URL } from "@/lib/api-base";
import { getAuthToken } from "@/lib/auth";
import { ManagerClientRow } from "@/types/client";
import { ManagerStats } from "@/types/manager-stats";
import { PaginationMeta } from "@/types/pagination";
import { ProjectType } from "@/types/project";

const API_URL = `${API_BASE_URL}/manager`;
const defaultOptions = {
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
};
const instance = axios.create(defaultOptions);

instance.interceptors.request.use((config) => {
  const TOKEN = getAuthToken();
  if (TOKEN) {
    config.headers.Authorization = `Bearer ${TOKEN}`;
  }
  return config;
});

export type PaginatedProjects = {
  projects: ProjectType[];
  pagination: PaginationMeta;
};

export async function getManagerProjects({
  pageParam = 1,
  limit = 10,
}: {
  pageParam?: number;
  limit?: number;
} = {}): Promise<PaginatedProjects> {
  const response = await instance.get("/projects", {
    params: {
      pageParam,
      limit,
    },
  });
  return response.data;
}

export async function getManagerStats(): Promise<ManagerStats> {
  const response = await instance.get("/stats");
  return response.data;
}

export type PaginatedManagerClients = {
  clients: ManagerClientRow[];
  pagination: PaginationMeta;
};

export async function getManagerClients({
  pageParam = 1,
  limit = 10,
}: {
  pageParam?: number;
  limit?: number;
} = {}): Promise<PaginatedManagerClients> {
  const response = await instance.get("/clients", {
    params: { pageParam, limit },
  });
  return response.data;
}
