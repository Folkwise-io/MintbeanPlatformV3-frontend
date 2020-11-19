import { IconName } from "@fortawesome/fontawesome-svg-core";

export interface Badge {
  id: string;
  alias: string;
  badgeShape: "star" | "circle" | "square";
  faIcon: IconName;
  backgroundHex?: string;
  iconHex?: string;
  title: string;
  description?: string;
  weight?: number;
  projects: ProjectForBadge[];
  createdAt: string;
}

export interface ProjectForBadge {
  id: string;
  title: string;
  user: UserForProjectForBadge;
}

export interface UserForProjectForBadge {
  firstName: string;
  lastName: string;
}

export interface CreateBadgeParams {
  alias: string;
  badgeShape: "star" | "circle" | "square";
  faIcon: IconName;
  backgroundHex?: string;
  iconHex?: string;
  title: string;
  description?: string;
  weight?: number;
}

export interface EditBadgeParams {
  alias?: string;
  badgeShape?: "star" | "circle" | "square";
  faIcon?: IconName;
  backgroundHex?: string;
  iconHex?: string;
  title?: string;
  description?: string;
  weight?: number;
}

export interface AwardBadgesParams {
  projectId: string;
  badgeIds: string[];
}

export type CustomOptionType = { value: IconName; label: IconName };
