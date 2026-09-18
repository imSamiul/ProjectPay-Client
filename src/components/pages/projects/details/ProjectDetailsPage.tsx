import { useSuspenseQuery } from "@tanstack/react-query";
import ProjectDetails from "@/components/pages/projects/details/ProjectDetails";
import PaymentList from "@/components/pages/projects/details/PaymentList";
import { ProjectActivity } from "@/components/pages/projects/details/ProjectActivity";
import { projectDetailsQuery } from "@/lib/queries/projects";

type ProjectDetailsPageProps = {
  projectCode: string;
};

export function ProjectDetailsPage({ projectCode }: ProjectDetailsPageProps) {
  const { data } = useSuspenseQuery(projectDetailsQuery(projectCode));

  return (
    <div className="flex flex-col gap-6">
      <ProjectDetails details={data} />
      <PaymentList
        projectName={data.name}
        projectCode={data.projectCode}
        clientName={data.clientName}
        due={data.due ?? 0}
        projectId={data._id ?? ""}
        paymentList={data.paymentList ?? []}
      />
      <ProjectActivity project={data} />
    </div>
  );
}
