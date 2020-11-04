import { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";

export interface Badge {
  badgeId: string;
  alias: string;
  badgeShape: "star" | "circle" | "square";
  faIcon: IconName;
  backgroundHex?: string;
  iconHex?: string;
  title: string;
  description?: string;
  weight?: number;
  createdAt: string;
}

export type CustomOptionType = { value: IconName; label: IconName };
