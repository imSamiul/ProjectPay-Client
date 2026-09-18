import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AuthenticationLayout } from "@/components/layout/AuthenticationLayout";

export const Route = createFileRoute("/_authentication")({
  component: AuthenticationRouteLayout,
  beforeLoad: async ({ context }) => {
    if (context.auth.isLogged()) {
      throw redirect({ to: "/" });
    }
  },
});

function AuthenticationRouteLayout() {
  return (
    <AuthenticationLayout>
      <Outlet />
    </AuthenticationLayout>
  );
}
