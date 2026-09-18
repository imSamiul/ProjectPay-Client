import { ProjectType } from "@/types/project";

export function isProjectOverdue(project: Pick<ProjectType, "endDate" | "due" | "status">): boolean {
  if (project.status) return false;
  if (!project.due || project.due <= 0) return false;
  if (!project.endDate) return false;

  const endDate = new Date(project.endDate);
  if (Number.isNaN(endDate.getTime())) return false;

  return endDate.getTime() < Date.now();
}
