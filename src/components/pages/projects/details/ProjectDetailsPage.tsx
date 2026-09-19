import { useSuspenseQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import ProjectDetails from "@/components/pages/projects/details/ProjectDetails";
import PaymentList from "@/components/pages/projects/details/PaymentList";
import { ProjectActivity } from "@/components/pages/projects/details/ProjectActivity";
import { ProjectClientsSection } from "@/components/pages/projects/details/ProjectClientsSection";
import { projectDetailsQuery } from "@/lib/queries/projects";

type ProjectDetailsPageProps = {
  projectCode: string;
};

export function ProjectDetailsPage({ projectCode }: ProjectDetailsPageProps) {
  const { data } = useSuspenseQuery(projectDetailsQuery(projectCode));
  const auth = useAuth();
  const isManager = auth.user?.userType === "project manager";

  return (
    <div className="flex flex-col gap-6">
      <ProjectDetails details={data} />
      {isManager ? (
        <ProjectClientsSection
          projectCode={data.projectCode ?? projectCode}
          clients={data.clients ?? []}
        />
      ) : null}
      <PaymentList
        projectName={data.name}
        projectCode={data.projectCode}
        clients={data.clients}
        due={data.due ?? 0}
        projectId={data._id ?? ""}
        paymentList={data.paymentList ?? []}
        isManager={isManager}
      />
      <ProjectActivity project={data} />
    </div>
  );
}
