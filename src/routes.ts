import React from "react";
import { Community, Hackathons, NotFound, Meets, StaticHome } from "./views/pages";

/* eslint-disable  @typescript-eslint/no-explicit-any */
interface RouteConfig {
  component: React.FC<any>;
  exact?: boolean;
  path?: string;
}
/* eslint-enable  @typescript-eslint/no-explicit-any */

export const routes: RouteConfig[] = [
  {
    component: Hackathons,
    path: "/hackathons",
  },
  {
    component: Meets,
    path: "/events",
  },
  {
    component: StaticHome,
    exact: true,
    path: "/",
  },
  {
    component: Community,
    exact: true,
    path: "/community",
  },
  {
    component: NotFound,
    path: "*",
  },
];
