import React from "react";
import { Home, Community, Hackathons, NotFound, Meets, Meet, Project } from "./views/pages";

/* eslint-disable  @typescript-eslint/no-explicit-any */
interface RouteConfig {
  component: React.FC<any>;
  exact?: boolean;
  path?: string;
}
/* eslint-enable  @typescript-eslint/no-explicit-any */

export const routes: RouteConfig[] = [
  // Removing Hackathons page for now. Decide whether to delete component later.
  // {
  //   component: Hackathons,
  //   path: "/hackathons",
  // },
  {
    component: Meet,
    path: "/meets/:id",
  },
  {
    component: Meets,
    path: "/meets",
  },
  {
    component: Project,
    path: "/projects/:id",
  },
  {
    component: Home,
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
