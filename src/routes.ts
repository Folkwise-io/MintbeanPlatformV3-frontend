import React from "react";
import { Home, Community, Hackathons, NotFound, Meets, Meet } from "./views/pages";

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
    component: Meet,
    path: "/meets/:id",
  },
  {
    component: Meets,
    path: "/meets",
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
