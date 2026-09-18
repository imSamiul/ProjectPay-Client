import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import Navbar from "../components/ui/Navbar";
import { fetchUserDetails } from "../services/apis";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    if (!context.auth.isLogged()) {
      throw redirect({
        to: "/login",
      });
    }
    const data = await fetchUserDetails();
    context.auth.user = data.user;
  },

  component: AuthenticatedLayout,
});
function AuthenticatedLayout() {
  // const auth = useAuth();

  // console.log(auth);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}
