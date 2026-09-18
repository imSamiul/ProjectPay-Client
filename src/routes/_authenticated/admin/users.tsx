import { createFileRoute } from "@tanstack/react-router";
import { AdminUsersPage } from "@/components/pages/admin/AdminUsersPage";
import { AdminUserRole } from "@/types/admin";

type UsersSearch = {
  page: number;
  role: AdminUserRole | "all";
};

function parsePage(value: unknown): number {
  const page = typeof value === "number" ? value : Number(value);
  return Number.isFinite(page) && page >= 1 ? Math.floor(page) : 1;
}

function parseRole(value: unknown): AdminUserRole | "all" {
  if (
    value === "client" ||
    value === "project manager" ||
    value === "admin" ||
    value === "all"
  ) {
    return value;
  }
  return "all";
}

export const Route = createFileRoute("/_authenticated/admin/users")({
  validateSearch: (search: Record<string, unknown>): UsersSearch => ({
    page: parsePage(search.page),
    role: parseRole(search.role),
  }),
  component: AdminUsersRoute,
});

function AdminUsersRoute() {
  const navigate = Route.useNavigate();
  const { page, role } = Route.useSearch();

  return (
    <AdminUsersPage
      page={page}
      role={role}
      onPageChange={(nextPage) =>
        navigate({ search: (prev) => ({ ...prev, page: nextPage }) })
      }
      onRoleChange={(nextRole) =>
        navigate({
          search: (prev) => ({ ...prev, role: nextRole, page: 1 }),
          replace: true,
        })
      }
    />
  );
}
