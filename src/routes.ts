import React from "react";
import { Home, Hackathons, Meets, NotFound } from "./views/pages";

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
    component: Home,
    exact: true,
    path: "/",
  },
  {
    component: NotFound,
    path: "*",
  },
];
