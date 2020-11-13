import { Badge, CreateBadgeParams, EditBadgeParams } from "../types/badge";

export interface BadgeDao {
  fetchBadges(): Promise<Badge[]>;
  fetchBadge(badgeId: string): Promise<Badge>;
  createBadge(params: CreateBadgeParams): Promise<Badge>;
  deleteBadge(badgeId: string): Promise<boolean>;
  editBadge(badgeId: string, params: EditBadgeParams): Promise<Badge>;
}
