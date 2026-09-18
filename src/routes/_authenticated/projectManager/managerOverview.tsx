import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/projectManager/managerOverview",
)({
  beforeLoad: () => {
    throw redirect({ to: "/projectManager/dashboard" });
  },
});
