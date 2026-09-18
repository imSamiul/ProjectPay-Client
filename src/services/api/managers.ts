import axios from "axios";
import { API_BASE_URL } from "@/lib/api-base";
import { getAuthToken } from "@/lib/auth";
import { ClientType } from "@/types/client";
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

export type PaginatedClients = {
  clients: ClientType[];
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

export type CreateClientPayload = {
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  password?: string;
};

export async function createManagerClient(payload: CreateClientPayload) {
  const response = await instance.post<{
    client: ClientType & { temporaryPassword?: string };
  }>("/clients", payload);
  return response.data;
}

export async function getManagerClients({
  pageParam = 1,
  limit = 10,
}: {
  pageParam?: number;
  limit?: number;
} = {}): Promise<PaginatedClients> {
  const response = await instance.get("/clients", {
    params: { pageParam, limit },
  });
  return response.data;
}
