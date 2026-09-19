import { createFileRoute } from "@tanstack/react-router";
import { ManagerClientsPage } from "@/components/pages/clients/ManagerClientsPage";
import { managerClientsQuery } from "@/lib/queries/clients";
import { PAGE_SIZE } from "@/lib/query-keys";

type ClientsSearch = {
  page: number;
};

function parsePage(value: unknown): number {
  const page = typeof value === "number" ? value : Number(value);
  return Number.isFinite(page) && page >= 1 ? Math.floor(page) : 1;
}

export const Route = createFileRoute("/_authenticated/projectManager/clients")({
  validateSearch: (search: Record<string, unknown>): ClientsSearch => ({
    page: parsePage(search.page),
  }),
  loaderDeps: ({ search }) => ({ page: search.page }),
  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(
      managerClientsQuery(deps.page, PAGE_SIZE),
    );
  },
  component: ClientsRoute,
});

function ClientsRoute() {
  const navigate = Route.useNavigate();
  const { page } = Route.useSearch();

  return (
    <ManagerClientsPage
      page={page}
      onPageChange={(nextPage) =>
        navigate({
          search: (prev) => ({ ...prev, page: nextPage }),
        })
      }
    />
  );
}
