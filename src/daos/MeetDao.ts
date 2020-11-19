import { Meet, CreateMeetParams, EditMeetParams } from "../../types";

export interface MeetDao {
  fetchMeets(): Promise<Meet[]>;
  fetchMeet(id: string): Promise<Meet>;
  createMeet(params: CreateMeetParams): Promise<Meet>;
  editMeet(id: string, params: EditMeetParams): Promise<Meet>;
  deleteMeet(id: string): Promise<boolean>;
  registerForMeet(meetId: string): Promise<boolean>;
}
