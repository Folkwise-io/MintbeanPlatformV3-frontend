import { MeetDao } from "daos/MeetDao";

export class TestMeetDao implements MeetDao {
  data: HackMeet[];
  constructor() {
    this.data = [];
  }
  async fetchMeets(): Promise<HackMeet[]> {
    return this.data;
  }
}