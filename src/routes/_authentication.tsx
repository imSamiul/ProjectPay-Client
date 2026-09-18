import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import authenticationPageImage from "../assets/authentication-page-image.jpg";

export const Route = createFileRoute("/_authentication")({
  component: AuthenticationLayout,
  beforeLoad: async ({ context }) => {
    if (context.auth.isLogged()) {
      throw redirect({
        to: "/",
      });
    }
  },
});

function AuthenticationLayout() {
  return (
    <div className="flex flex-col-reverse md:flex-row">
      <div className="flex-1 flex flex-col items-center justify-center">
        <Outlet />
      </div>
      <div className="flex-1 h-screen">
        <img
          src={authenticationPageImage}
          alt="authentication page image"
          className="h-full"
        />
      </div>
    </div>
  );
}
