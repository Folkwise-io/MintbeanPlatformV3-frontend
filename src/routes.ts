import React from "react";
import { Home, NotFound, StaticHome } from "./views/pages";

interface RouteConfig {
  component: React.FC<void>;
  exact?: boolean;
  path?: string;
}

export const routes: RouteConfig[] = [
  {
    component: Home,
    exact: true,
    path: "/",
  },
  {
    component: StaticHome,
    exact: true,
    path: "/home",
  },
  {
    component: NotFound,
    path: "*",
  },
];
