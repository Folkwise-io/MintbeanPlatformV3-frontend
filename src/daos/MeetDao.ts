export interface MeetDao {
  fetchMeets(): Promise<Meet[]>;
  createMeet(params: CreateMeetParams): Promise<Meet>;
}
