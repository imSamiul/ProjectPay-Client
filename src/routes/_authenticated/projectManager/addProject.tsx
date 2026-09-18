import { createFileRoute } from "@tanstack/react-router";
import { AddProjectForm } from "@/components/pages/projects/add/AddProjectForm";

export const Route = createFileRoute(
  "/_authenticated/projectManager/addProject",
)({
  component: AddProjectRoute,
});

function AddProjectRoute() {
  return <AddProjectForm />;
}
