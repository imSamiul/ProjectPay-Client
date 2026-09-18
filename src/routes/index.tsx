import { createFileRoute, redirect } from "@tanstack/react-router";
import { HomePage } from "@/components/pages/home/HomePage";
import { currentUserQuery } from "@/lib/queries/users";
import { clearAuthToken } from "@/lib/auth";

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    if (!context.auth.isLogged()) {
      return { user: null as null };
    }

    let data;
    try {
      data = await context.queryClient.ensureQueryData(currentUserQuery);
    } catch {
      clearAuthToken();
      return { user: null as null };
    }

    context.auth.setUserDetails(data.user);
    if (data.user.userType === "project manager") {
      throw redirect({
        to: "/projectManager/dashboard",
      });
    }
    if (data.user.userType === "admin") {
      throw redirect({ to: "/admin" });
    }
    return { user: data.user };
  },
  component: HomeRoute,
});

function HomeRoute() {
  const { user } = Route.useLoaderData();
  return <HomePage user={user} />;
}
