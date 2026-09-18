import * as React from "react";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

import { RouterContext } from "../types/routerContextType";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  ),
  notFoundComponent: () => (
    <div>Freak! make a component first. Useless Developer.</div>
  ),
});
