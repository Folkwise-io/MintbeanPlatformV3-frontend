import { MeetDao } from "daos/MeetDao";

export class TestMeetDao implements MeetDao {
  data: HackEvent[];
  constructor() {
    this.data = [];
  }
  async fetchMeets(): Promise<HackEvent[]> {
    return this.data;
  }
}
