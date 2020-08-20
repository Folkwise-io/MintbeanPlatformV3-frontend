import React from "react";
import { Home } from "./views/pages";

interface RouteConfig {
  component: React.FC;
  exact: boolean;
  path: string;
}

export const routes: RouteConfig[] = [
  {
    component: Home,
    exact: true,
    path: "/",
  },
];
