import { queryOptions } from "@tanstack/react-query";
import { getAdminProjects, getAdminStats, getAdminUsers } from "@/services/api/admin";
import { adminKeys, PAGE_SIZE } from "@/lib/query-keys";
import { AdminUserRole } from "@/types/admin";

export const adminStatsQuery = queryOptions({
  queryKey: adminKeys.stats(),
  queryFn: getAdminStats,
});

export const adminUsersQuery = (page: number, limit = PAGE_SIZE, role?: AdminUserRole) =>
  queryOptions({
    queryKey: adminKeys.usersList(page, limit, role),
    queryFn: () => getAdminUsers({ pageParam: page, limit, role }),
  });

export const adminProjectsQuery = (page: number, limit = PAGE_SIZE) =>
  queryOptions({
    queryKey: adminKeys.projectsList(page, limit),
    queryFn: () => getAdminProjects({ pageParam: page, limit }),
  });
