import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/projectManager")({
  beforeLoad: async ({ context }) => {
    const user = context.auth.user;

    if (!user || user.userType !== "project manager") {
      throw redirect({ to: "/" });
    }
  },

  component: ProjectManagerLayout,
});

function ProjectManagerLayout() {
  return (
    <div className="container mx-auto">
      <Outlet />
    </div>
  );
}
