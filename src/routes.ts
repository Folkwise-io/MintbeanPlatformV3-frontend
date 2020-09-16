import React from "react";
import { Home, Login, Hackathons, NotFound } from "./views/pages";

interface RouteConfig {
  component: React.FC<void>;
  exact?: boolean;
  path?: string;
}

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
    component: Home,
    exact: true,
    path: "/",
  },
  {
    component: NotFound,
    path: "*",
  },
];
