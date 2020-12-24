import React from "react";
import {
  Home,
  Community,
  TermsOfService,
  PrivacyPolicy,
  NotFound,
  Meet,
  Project,
  Admin,
  CreateBadge,
  Badges,
  BadgeTemplate,
  Partners,
} from "./views/pages";

interface RouteConfig {
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  component: React.FC<any>;
  exact?: boolean;
  path?: string;
}

export const routes: RouteConfig[] = [
  {
    component: Meet,
    path: "/meets/:id",
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
    component: Partners,
    exact: true,
    path: "/partners",
  },
  {
    component: Admin,
    exact: true,
    path: "/admin",
  },
  {
    component: CreateBadge,
    exact: true,
    path: "/admin/create-badge",
  },
  {
    component: Badges,
    exact: true,
    path: "/badges",
  },
  {
    component: BadgeTemplate,
    path: "/badges/:id",
  },
  {
    component: NotFound,
    path: "*",
  },
];
