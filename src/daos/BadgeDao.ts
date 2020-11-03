import { Badge } from "../types/badge";

export interface BadgeDao {
  fetchBadges(): Promise<Badge[]>;
}
