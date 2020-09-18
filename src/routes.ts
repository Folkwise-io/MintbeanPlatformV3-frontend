import React from "react";
import { Login, StaticHome, Hackathons, NotFound, Meets } from "./views/pages";

/* eslint-disable  @typescript-eslint/no-explicit-any */
interface RouteConfig {
  component: React.FC<any>;
  exact?: boolean;
  path?: string;
}
/* eslint-enable  @typescript-eslint/no-explicit-any */

export const routes: RouteConfig[] = [
  {
    component: Login,
    path: "/login",
  },
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
    component: NotFound,
    path: "*",
  },
];
