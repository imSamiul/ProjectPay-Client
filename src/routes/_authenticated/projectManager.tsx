import { createFileRoute, Outlet } from "@tanstack/react-router";
import { ErrorComponentProps } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/projectManager")({
  beforeLoad: async ({ context }) => {
    const user = context.auth.user; // Ensure you get the updated user value

    if (!user) {
      throw new Error("User not available in context");
    }

    if (user.userType !== "project manager") {
      throw new Error("You are not authorized to access this page");
    }
  },

  component: ProjectManagerLayout,
  errorComponent: ErrorComponent,
  onError: (error) => {
    console.error(error);
  },
});

function ProjectManagerLayout() {
  return (
    <div className="container mx-auto">
      <Outlet />
    </div>
  );
}

function ErrorComponent({ error }: ErrorComponentProps) {
  return <div>{error.message}</div>;
}
