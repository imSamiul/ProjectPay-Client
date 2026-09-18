import { createFileRoute } from "@tanstack/react-router";
import Navbar from "../components/ui/Navbar";
import { fetchUserDetails } from "../services/apis";

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    if (context.auth.isLogged()) {
      const data = await fetchUserDetails();
      context.auth.setUserDetails(data.user);
      return data.user;
    }
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const user = Route.useLoaderData();
  console.log(user);

  return (
    <div>
      <Navbar />
    </div>
  );
}
