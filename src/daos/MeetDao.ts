export interface MeetDao {
  fetchMeets(): Promise<HackMeet[]>;
}
