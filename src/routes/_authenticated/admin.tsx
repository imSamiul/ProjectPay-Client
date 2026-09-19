import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin")({
  beforeLoad: ({ context }) => {
    if (context.user.userType !== "admin") {
      throw redirect({ to: "/" });
    }
  },
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <div className="container mx-auto">
      <Outlet />
    </div>
  );
}
