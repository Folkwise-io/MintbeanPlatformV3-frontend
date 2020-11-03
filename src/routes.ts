import React from "react";
import {
  Home,
  Community,
  TermsOfService,
  PrivacyPolicy,
  /* Hackathons,*/ NotFound,
  Meets,
  Meet,
  Project,
  Admin,
} from "./views/pages";

interface RouteConfig {
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  component: React.FC<any>;
  exact?: boolean;
  path?: string;
}

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
    component: TermsOfService,
    path: "/terms-of-service",
  },
  {
    component: PrivacyPolicy,
    path: "/privacy-policy",
  },
  {
    component: Community,
    exact: true,
    path: "/community",
  },
  {
    component: Admin,
    exact: true,
    path: "/admin",
  },
  {
    component: NotFound,
    path: "*",
  },
];
