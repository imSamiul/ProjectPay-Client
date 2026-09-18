import { createFileRoute } from "@tanstack/react-router";
import { ProjectDetailsPage } from "@/components/pages/projects/details/ProjectDetailsPage";
import { projectDetailsQuery } from "@/lib/queries/projects";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/_authenticated/project/$projectCode")({
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(
      projectDetailsQuery(params.projectCode),
    );
  },
  component: ProjectRoute,
  pendingComponent: ProjectPending,
});

function ProjectPending() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-64 w-full rounded-xl" />
      <Skeleton className="h-48 w-full rounded-xl" />
    </div>
  );
}

function ProjectRoute() {
  const { projectCode } = Route.useParams();
  return <ProjectDetailsPage projectCode={projectCode} />;
}
