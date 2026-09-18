import { createRootRouteWithContext, Link, Outlet } from "@tanstack/react-router";
import { RouterContext } from "@/types/router-context";
import { Button } from "@/components/ui/button";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => <Outlet />,
  notFoundComponent: () => (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="max-w-md text-muted-foreground">
        The page you are looking for does not exist or was moved.
      </p>
      <Button render={<Link to="/" />}>Back to home</Button>
    </div>
  ),
});
