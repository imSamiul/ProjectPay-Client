import axios from "axios";
import { getAuthToken } from "../utils/auth";

const API_URL = `${import.meta.env.VITE_API_URL}/manager`;
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

// GET:Manger
// get all projects for manager

export async function getManagerProjects({ pageParam }: { pageParam: number }) {
  try {
    const response = await instance.get("/projects", {
      params: {
        pageParam,
        limit: 10,
      },
    });

    return response.data.projects;
  } catch (error) {
    console.log("Error loading all projects", error);
    throw error;
  }
}
