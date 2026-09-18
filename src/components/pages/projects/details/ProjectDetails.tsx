import type { ReactNode } from "react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { CheckIcon, DownloadIcon, PencilIcon } from "lucide-react";
import { toast } from "sonner";
import { ManagerType } from "@/types/manager";
import { ProjectType } from "@/types/project";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useUpdateProjectStatus } from "@/services/mutations/use-project-mutations";
import ProjectDeleteModal from "@/components/pages/projects/shared/ProjectDeleteModal";
import { formatCurrency, formatDate } from "@/lib/format";
import { isProjectOverdue } from "@/lib/project";
import { downloadProjectInvoice } from "@/lib/pdf";

type ClientSectionKeys = keyof ProjectType;
type ProjectSectionKeys = keyof ProjectType;
type ManagerSectionKeys = keyof ManagerType;

const CURRENCY_FIELDS: string[] = ["budget", "advance", "due", "totalPaid"];
const DATE_FIELDS: string[] = ["startDate", "endDate"];

const ClientSection: { name: string; value: ClientSectionKeys }[] = [
  { name: "Client Name", value: "clientName" },
  { name: "Client Email", value: "clientEmail" },
  { name: "Client Phone", value: "clientPhone" },
  { name: "Client Address", value: "clientAddress" },
  { name: "Client Details", value: "clientDetails" },
];

const ProjectSection: { name: string; value: ProjectSectionKeys }[] = [
  { name: "Project Code", value: "projectCode" },
  { name: "Budget", value: "budget" },
  { name: "Advance", value: "advance" },
  { name: "Due", value: "due" },
  { name: "Total Paid", value: "totalPaid" },
  { name: "Start Date", value: "startDate" },
  { name: "End Date", value: "endDate" },
  { name: "Demo Link", value: "demoLink" },
  { name: "Type of Web", value: "typeOfWeb" },
  { name: "Description", value: "description" },
];

const ProjectManager: { name: string; value: ManagerSectionKeys }[] = [
  { name: "Project Manager Name", value: "name" },
  { name: "Project Manager Email", value: "email" },
];

type ProjectDetailsPropsType = {
  details: ProjectType & ManagerType;
};

function formatDetailValue(field: string, value: unknown): ReactNode {
  if (CURRENCY_FIELDS.includes(field) && typeof value === "number") {
    return formatCurrency(value);
  }
  if (DATE_FIELDS.includes(field) && typeof value === "string") {
    return formatDate(value);
  }
  if (typeof value === "object" && value !== null) {
    return JSON.stringify(value);
  }
  return value as ReactNode;
}

function ProjectDetails({ details }: ProjectDetailsPropsType) {
  const updateProjectStatus = useUpdateProjectStatus();
  const [isGeneratingInvoice, setIsGeneratingInvoice] = useState(false);

  function handleProjectStatus() {
    const status = !details.status;
    updateProjectStatus.mutate({ projectCode: details.projectCode!, status });
  }

  async function handleDownloadInvoice() {
    setIsGeneratingInvoice(true);
    try {
      await downloadProjectInvoice(details);
    } catch {
      toast.error("Couldn't generate the invoice. Please try again.");
    } finally {
      setIsGeneratingInvoice(false);
    }
  }

  const budget = details.budget ?? 0;
  const paid = details.totalPaid ?? 0;
  const paidPercent = budget > 0 ? Math.min(100, (paid / budget) * 100) : 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold md:text-3xl">{details.name}</h1>
          {isProjectOverdue(details) ? <Badge variant="destructive">Overdue</Badge> : null}
          <Badge variant={details.status ? "default" : "secondary"}>
            {details.status ? "Done" : "Active"}
          </Badge>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            onClick={handleDownloadInvoice}
            disabled={isGeneratingInvoice}
          >
            <DownloadIcon data-icon="inline-start" />
            {isGeneratingInvoice ? "Preparing…" : "Invoice"}
          </Button>
          <Button
            variant={details.status ? "secondary" : "default"}
            onClick={handleProjectStatus}
            disabled={updateProjectStatus.isPending}
          >
            <CheckIcon data-icon="inline-start" />
            {details.status ? "Done" : "Make Complete"}
          </Button>
          <Button
            render={
              <Link
                to="/project/edit/$projectCode"
                params={{
                  projectCode: details.projectCode ?? "",
                }}
              />
            }
          >
            <PencilIcon data-icon="inline-start" />
            Edit
          </Button>
          <ProjectDeleteModal
            modalId="projectDeleteModal"
            projectCode={details.projectCode!}
            projectId={details._id!}
            projectName={details.name}
          />
        </div>
      </div>

      <Card className="border-border bg-card shadow-none">
        <CardContent className="flex flex-col gap-2">
          <Progress value={paidPercent}>
            <div className="flex w-full items-baseline justify-between">
              <span className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{formatCurrency(paid)}</span>{" "}
                paid of {formatCurrency(budget)}
              </span>
              <span className="text-sm font-medium text-foreground">
                {formatCurrency(details.due ?? 0)} due
              </span>
            </div>
          </Progress>
        </CardContent>
      </Card>

      <Separator />

      <Card className="border-border bg-card shadow-none">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Project Section</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
            {ProjectSection.map((projectDetail) => {
              const value = details[projectDetail.value];
              return (
                <p key={projectDetail.value} className="text-sm md:text-base">
                  <span className="font-medium text-foreground">
                    {projectDetail.name}:{" "}
                  </span>
                  <span className="text-muted-foreground">
                    {formatDetailValue(projectDetail.value, value)}
                  </span>
                </p>
              );
            })}
          </div>

          <Separator />

          <div className="flex flex-col gap-3">
            <h4 className="text-lg font-semibold md:text-xl">Client Section</h4>
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
              {ClientSection.map((clientDetail) => {
                const value = details[clientDetail.value];
                return (
                  <p key={clientDetail.value} className="text-sm md:text-base">
                    <span className="font-medium text-foreground">
                      {clientDetail.name}:{" "}
                    </span>
                    <span className="text-muted-foreground">
                      {formatDetailValue(clientDetail.value, value)}
                    </span>
                  </p>
                );
              })}
            </div>
          </div>

          <Separator />

          <div className="flex flex-col gap-3">
            <h4 className="text-lg font-semibold md:text-xl">Manager Section</h4>
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
              {ProjectManager.map((managerDetail) => {
                const value = details.projectManager?.[managerDetail.value];
                return (
                  <p key={managerDetail.value} className="text-sm md:text-base">
                    <span className="font-medium text-foreground">
                      {managerDetail.name}:{" "}
                    </span>
                    <span className="text-muted-foreground">
                      {formatDetailValue(managerDetail.value, value)}
                    </span>
                  </p>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProjectDetails;
