export interface MeetDao {
  fetchMeets(): Promise<HackEvent[]>;
}
