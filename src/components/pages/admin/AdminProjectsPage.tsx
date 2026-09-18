import { useAdminProjects } from "@/lib/queries/admin-hooks";
import { formatCurrency } from "@/lib/format";
import { PAGE_SIZE } from "@/lib/query-keys";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/shared/Pagination";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";

type AdminProjectsPageProps = {
  page: number;
  onPageChange: (page: number) => void;
};

export function AdminProjectsPage({ page, onPageChange }: AdminProjectsPageProps) {
  const projects = useAdminProjects(page, PAGE_SIZE);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h1>Projects</h1>
        <p className="text-muted-foreground">
          Browse every project across all managers on the platform.
        </p>
      </div>

      <Card className="border-border bg-card shadow-none">
        <CardHeader>
          <CardTitle className="text-lg">All projects</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {projects.isLoading ? (
            <div className="flex flex-col gap-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-10 w-full" />
              ))}
            </div>
          ) : (projects.data?.projects.length ?? 0) === 0 ? (
            <Empty className="border border-dashed border-border py-10">
              <EmptyHeader>
                <EmptyTitle>No projects yet</EmptyTitle>
                <EmptyDescription>
                  Projects created by managers will show up here.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Manager</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Due</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.data?.projects.map((project) => (
                  <TableRow key={project._id}>
                    <TableCell className="font-medium text-foreground">
                      {project.name}
                      <span className="block text-xs text-muted-foreground">
                        {project.projectCode}
                      </span>
                    </TableCell>
                    <TableCell>{project.projectManager?.name ?? "—"}</TableCell>
                    <TableCell>{formatCurrency(project.budget)}</TableCell>
                    <TableCell>{formatCurrency(project.due)}</TableCell>
                    <TableCell>
                      <Badge variant={project.status ? "default" : "secondary"}>
                        {project.status ? "Done" : "Active"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {(projects.data?.pagination.totalPages ?? 1) > 1 ? (
            <Pagination
              totalPages={projects.data?.pagination.totalPages ?? 1}
              currentPage={page}
              onPageChange={onPageChange}
            />
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
