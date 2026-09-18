import { Link } from "@tanstack/react-router";
import { ProjectType } from "@/types/project";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, formatDate } from "@/lib/format";
import { isProjectOverdue } from "@/lib/project";

type ProjectGridProps = {
  projects: ProjectType[];
  isLoading?: boolean;
};

function ProjectGrid({ projects, isLoading }: ProjectGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-56 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <Empty className="border border-dashed border-border py-16">
        <EmptyHeader>
          <EmptyTitle>No projects found</EmptyTitle>
          <EmptyDescription>
            Try a different search, or create a new project.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => {
        const budget = project.budget ?? 0;
        const paid = project.totalPaid ?? 0;
        const paidPercent =
          budget > 0 ? Math.min(100, (paid / budget) * 100) : 0;

        return (
          <Link
            key={project._id}
            to="/project/$projectCode"
            params={{ projectCode: project.projectCode ?? "" }}
            className="group block rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <Card className="h-full border-border bg-card shadow-none transition-colors group-hover:border-primary/45">
              <CardHeader className="flex flex-row items-start justify-between gap-3">
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <div className="flex flex-wrap items-center justify-end gap-1.5">
                  {isProjectOverdue(project) ? (
                    <Badge variant="destructive">Overdue</Badge>
                  ) : null}
                  <Badge variant={project.status ? "default" : "secondary"}>
                    {project.status ? "Done" : "Active"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 text-sm">
                <div className="flex flex-col gap-1">
                  <p>
                    <span className="font-medium text-foreground">Code:</span>{" "}
                    {project.projectCode}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Client:</span>{" "}
                    {project.clientName}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Phone:</span>{" "}
                    {project.clientPhone}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">
                      Deadline:
                    </span>{" "}
                    {formatDate(project.endDate)}
                  </p>
                </div>

                <Progress value={paidPercent} className="gap-1.5">
                  <div className="flex w-full items-center justify-between text-xs text-muted-foreground">
                    <span>{formatCurrency(paid)} paid</span>
                    <span>{formatCurrency(project.due ?? 0)} due</span>
                  </div>
                </Progress>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}

export default ProjectGrid;
