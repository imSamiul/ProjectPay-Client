import { createFileRoute } from "@tanstack/react-router";
import { AdminProjectsPage } from "@/components/pages/admin/AdminProjectsPage";

type ProjectsSearch = {
  page: number;
};

function parsePage(value: unknown): number {
  const page = typeof value === "number" ? value : Number(value);
  return Number.isFinite(page) && page >= 1 ? Math.floor(page) : 1;
}

export const Route = createFileRoute("/_authenticated/admin/projects")({
  validateSearch: (search: Record<string, unknown>): ProjectsSearch => ({
    page: parsePage(search.page),
  }),
  component: AdminProjectsRoute,
});

function AdminProjectsRoute() {
  const navigate = Route.useNavigate();
  const { page } = Route.useSearch();

  return (
    <AdminProjectsPage
      page={page}
      onPageChange={(nextPage) =>
        navigate({ search: (prev) => ({ ...prev, page: nextPage }) })
      }
    />
  );
}
