export interface EventDao {
  fetchEvents(): Promise<HackEvent[]>;
}
