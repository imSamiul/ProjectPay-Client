import { createFileRoute } from "@tanstack/react-router";
import { ClientsPage } from "@/components/pages/clients/ClientsPage";
import { managerClientsQuery } from "@/lib/queries/clients";
import { PAGE_SIZE } from "@/lib/query-keys";

type ClientsSearch = {
  page: number;
};

function parsePage(value: unknown): number {
  const page = typeof value === "number" ? value : Number(value);
  return Number.isFinite(page) && page >= 1 ? Math.floor(page) : 1;
}

export const Route = createFileRoute(
  "/_authenticated/projectManager/addClient",
)({
  validateSearch: (search: Record<string, unknown>): ClientsSearch => ({
    page: parsePage(search.page),
  }),
  loaderDeps: ({ search }) => ({ page: search.page }),
  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(
      managerClientsQuery(deps.page, PAGE_SIZE),
    );
  },
  component: AddClientRoute,
});

function AddClientRoute() {
  const navigate = Route.useNavigate();
  const { page } = Route.useSearch();

  return (
    <ClientsPage
      page={page}
      onPageChange={(nextPage) =>
        navigate({
          search: (prev) => ({ ...prev, page: nextPage }),
        })
      }
    />
  );
}
