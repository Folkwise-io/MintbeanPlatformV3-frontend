import { Badge, CreateBadgeParams, EditBadgeParams } from "../types/badge";

export interface BadgeDao {
  fetchBadges(): Promise<Badge[]>;
  fetchBadge(id: string): Promise<Badge>;
  createBadge(params: CreateBadgeParams): Promise<Badge>;
  deleteBadge(id: string): Promise<boolean>;
  editBadge(id: string, params: EditBadgeParams): Promise<Badge>;
}
