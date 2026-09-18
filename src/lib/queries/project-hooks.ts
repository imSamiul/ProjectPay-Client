import { useQuery } from "@tanstack/react-query";
import {
  myProjectsQuery,
  projectDetailsQuery,
  searchProjectsQuery,
  managerProjectsQuery,
  managerStatsQuery,
} from "@/lib/queries/projects";
import { managerClientsQuery } from "@/lib/queries/clients";
import { PAGE_SIZE } from "@/lib/query-keys";

export function useManagerProjects(page: number, limit = PAGE_SIZE) {
  return useQuery(managerProjectsQuery(page, limit));
}

export function useManagerStats() {
  return useQuery(managerStatsQuery);
}

export function useSearchProject(
  searchString: string,
  page: number,
  limit = PAGE_SIZE,
) {
  return useQuery(searchProjectsQuery(searchString, page, limit));
}

export function useGetProjectDetails(projectCode: string) {
  return useQuery(projectDetailsQuery(projectCode));
}

export function useMyProjects(enabled: boolean) {
  return useQuery({ ...myProjectsQuery, enabled });
}

export function useManagerClients(page: number, limit = PAGE_SIZE) {
  return useQuery(managerClientsQuery(page, limit));
}
