import { queryOptions } from "@tanstack/react-query";
import { getManagerProjects, getManagerStats } from "@/services/api/managers";
import {
  getMyProjects,
  getProjectDetails,
  searchProject,
} from "@/services/api/projects";
import { PAGE_SIZE, projectKeys } from "@/lib/query-keys";

export const managerProjectsQuery = (page: number, limit = PAGE_SIZE) =>
  queryOptions({
    queryKey: projectKeys.list(page, limit),
    queryFn: () => getManagerProjects({ pageParam: page, limit }),
  });

export const managerStatsQuery = queryOptions({
  queryKey: projectKeys.managerStats(),
  queryFn: getManagerStats,
});

export const projectDetailsQuery = (projectCode: string) =>
  queryOptions({
    queryKey: projectKeys.detail(projectCode),
    queryFn: () => getProjectDetails(projectCode),
    enabled: !!projectCode,
  });

export const searchProjectsQuery = (
  searchString: string,
  page: number,
  limit = PAGE_SIZE,
) =>
  queryOptions({
    queryKey: projectKeys.search(searchString, page, limit),
    queryFn: () => searchProject(searchString, page, limit),
    enabled: !!searchString,
  });

export const myProjectsQuery = queryOptions({
  queryKey: projectKeys.mine(),
  queryFn: getMyProjects,
  retry: false,
});
