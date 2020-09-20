export interface MeetDao {
  fetchMeets(): Promise<Meet[]>;
  fetchMeet(id: string): Promise<Meet>;
  createMeet(params: CreateMeetParams): Promise<Meet>;
  deleteMeet(id: string): Promise<boolean>;
}
