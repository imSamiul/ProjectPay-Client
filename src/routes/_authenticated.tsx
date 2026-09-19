import { createFileRoute, redirect } from "@tanstack/react-router";
import { AuthenticatedLayout } from "@/components/layout/AuthenticatedLayout";
import { currentUserQuery } from "@/lib/queries/users";
import { clearAuthToken } from "@/lib/auth";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    if (!context.auth.isLogged()) {
      throw redirect({ to: "/login" });
    }

    let data;
    try {
      data = await context.queryClient.ensureQueryData(currentUserQuery);
    } catch {
      clearAuthToken();
      throw redirect({ to: "/login" });
    }

    context.auth.setUserDetails(data.user);

    return { user: data.user };
  },
  component: AuthenticatedLayout,
});
