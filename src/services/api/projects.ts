import axios from "axios";
import { getAuthToken } from "@/lib/auth";
import { API_BASE_URL } from "@/lib/api-base";
import {
  ProjectType,
  UpdateProjectStatusType,
  UpdateProjectType,
} from "@/types/project";
import { PaginationMeta } from "@/types/pagination";

const API_URL = `${API_BASE_URL}/projects`;
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

// GET:Project
// get project details
export async function getProjectDetails(projectCode: string) {
  try {
    const response = await instance.get(`/details/${projectCode}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 404) {
        throw new Error(error.response.data || "Project not found");
      }
    }
    throw error;
  }
}

// GET: projects belonging to the signed-in client
export async function getMyProjects() {
  try {
    const response = await instance.get("/mine");
    return response.data;
  } catch (error) {
    console.error("Error loading your projects:", error);
    throw error;
  }
}

export type PaginatedProjectSearch = {
  projects: ProjectType[];
  pagination: PaginationMeta;
};

// search project
export async function searchProject(
  searchString: string,
  pageParam = 1,
  limit = 10,
): Promise<PaginatedProjectSearch> {
  try {
    const response = await instance.get("/search", {
      params: {
        q: searchString,
        pageParam,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching project:", error);
    throw error;
  }
}

// POST:create new project
export async function createNewProject(projectObject: ProjectType) {
  try {
    const response = await instance.post("/create", projectObject);
    return response.data;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
}

// PATCH:update project status
export async function updateProjectStatus(
  updatedStatusObj: UpdateProjectStatusType,
) {
  try {
    const response = await instance.patch(
      `/updateProjectStatus/${updatedStatusObj.projectCode}`,
      {
        status: updatedStatusObj.status,
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error updating project status:", error);
    throw error;
  }
}
// PATCH: update project
export async function apiUpdateProjectDetails(
  projectObject: UpdateProjectType,
) {
  try {
    const response = await instance.patch(
      `/updateProjectDetails/${projectObject.projectCode}`,
      projectObject,
    );
    return response.data;
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
}

// DELETE: delete project
export async function deleteProject(projectId: string) {
  try {
    const response = await instance.delete(`/delete/${projectId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
}

// POST: link a client to a project using their client key
export async function linkClientToProject(
  projectCode: string,
  clientKey: string,
) {
  const response = await instance.post(`/${projectCode}/clients`, {
    clientKey,
  });
  return response.data;
}

// DELETE: unlink a client from a project
export async function unlinkClientFromProject(
  projectCode: string,
  clientId: string,
) {
  const response = await instance.delete(
    `/${projectCode}/clients/${clientId}`,
  );
  return response.data;
}
