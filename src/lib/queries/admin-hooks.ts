import { useQuery } from "@tanstack/react-query";
import { adminProjectsQuery, adminStatsQuery, adminUsersQuery } from "@/lib/queries/admin";
import { PAGE_SIZE } from "@/lib/query-keys";
import { AdminUserRole } from "@/types/admin";

export function useAdminStats() {
  return useQuery(adminStatsQuery);
}

export function useAdminUsers(page: number, limit = PAGE_SIZE, role?: AdminUserRole) {
  return useQuery(adminUsersQuery(page, limit, role));
}

export function useAdminProjects(page: number, limit = PAGE_SIZE) {
  return useQuery(adminProjectsQuery(page, limit));
}
