import { ProjectStats } from "@/components/pages/projects/overview/ProjectStats";

export function ManagerDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h1>Dashboard</h1>
        <p className="text-muted-foreground">
          Track payment health across every project in your workspace.
        </p>
      </div>
      <ProjectStats />
    </div>
  );
}
