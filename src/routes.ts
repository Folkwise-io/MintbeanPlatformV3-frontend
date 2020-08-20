import { Home } from "./views/pages";

interface RouteConfig {
  component: any;
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
