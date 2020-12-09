import { CreateMeetInput, EditMeetInput, Meet } from "../types/meet";

export interface MeetDao {
  fetchMeets(): Promise<Meet[]>;
  fetchMeet(id: string): Promise<Meet>;
  createMeet(params: CreateMeetInput): Promise<Meet>;
  editMeet(id: string, params: EditMeetInput): Promise<Meet>;
  deleteMeet(id: string): Promise<boolean>;
  registerForMeet(meetId: string): Promise<boolean>;
}
