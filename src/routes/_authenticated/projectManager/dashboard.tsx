import { createFileRoute } from "@tanstack/react-router";
import { ManagerDashboardPage } from "@/components/pages/projects/overview/ManagerDashboardPage";
import { managerStatsQuery } from "@/lib/queries/projects";

export const Route = createFileRoute("/_authenticated/projectManager/dashboard")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(managerStatsQuery);
  },
  component: ManagerDashboardPage,
  pendingComponent: () => (
    <div className="text-muted-foreground">Loading dashboard…</div>
  ),
});
