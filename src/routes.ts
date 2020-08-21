import React from "react";
import { Home, NotFound } from "./views/pages";

interface RouteConfig {
  component: React.FC<any>;
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
    component: NotFound,
    path: "*",
  },
];
