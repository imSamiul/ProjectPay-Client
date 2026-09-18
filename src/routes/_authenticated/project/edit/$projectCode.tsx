import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { EditProjectForm } from "@/components/pages/projects/edit/EditProjectForm";
import { projectDetailsQuery } from "@/lib/queries/projects";
import { ProjectType, UpdateProjectType } from "@/types/project";
import { Skeleton } from "@/components/ui/skeleton";

type CombinedProjectType = ProjectType & UpdateProjectType;

export const Route = createFileRoute(
  "/_authenticated/project/edit/$projectCode",
)({
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(
      projectDetailsQuery(params.projectCode),
    );
  },
  component: EditProjectRoute,
  pendingComponent: () => (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-10 w-72" />
      <Skeleton className="h-96 w-full rounded-xl" />
    </div>
  ),
});

function EditProjectRoute() {
  const { projectCode } = Route.useParams();
  const { data } = useSuspenseQuery(projectDetailsQuery(projectCode));

  return (
    <EditProjectForm
      key={data._id ?? projectCode}
      projectCode={projectCode}
      initialData={data as CombinedProjectType}
    />
  );
}
