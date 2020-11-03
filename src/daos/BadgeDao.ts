import { Badge } from "../types/badge";

export interface BadgeDao {
  fetchBadges(): Promise<Badge[]>;
  fetchBadge(badgeId: string): Promise<Badge>;
}
