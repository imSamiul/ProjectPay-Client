import { createFileRoute } from "@tanstack/react-router";
import { ManagerProjectsPage } from "@/components/pages/projects/overview/ManagerProjectsPage";
import { managerProjectsQuery } from "@/lib/queries/projects";
import { PAGE_SIZE } from "@/lib/query-keys";

type ProjectsSearch = {
  q: string;
  page: number;
};

function parsePage(value: unknown): number {
  const page = typeof value === "number" ? value : Number(value);
  return Number.isFinite(page) && page >= 1 ? Math.floor(page) : 1;
}

export const Route = createFileRoute(
  "/_authenticated/projectManager/projects",
)({
  validateSearch: (search: Record<string, unknown>): ProjectsSearch => ({
    q: typeof search.q === "string" ? search.q : "",
    page: parsePage(search.page),
  }),
  loaderDeps: ({ search }) => ({ q: search.q, page: search.page }),
  loader: async ({ context, deps }) => {
    if (!deps.q) {
      await context.queryClient.ensureQueryData(
        managerProjectsQuery(deps.page, PAGE_SIZE),
      );
    }
  },
  component: ManagerProjectsRoute,
  pendingComponent: () => (
    <div className="text-muted-foreground">Loading projects…</div>
  ),
});

function ManagerProjectsRoute() {
  const navigate = Route.useNavigate();
  const { q, page } = Route.useSearch();

  return (
    <ManagerProjectsPage
      q={q}
      page={page}
      onSearchChange={(next) =>
        navigate({
          search: (prev) => ({ ...prev, q: next, page: 1 }),
          replace: true,
        })
      }
      onPageChange={(nextPage) =>
        navigate({
          search: (prev) => ({ ...prev, page: nextPage }),
        })
      }
    />
  );
}
