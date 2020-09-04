import { EventDao } from "daos/EventDao";

export class TestEventDao implements EventDao {
  data: HackEvent[];
  constructor() {
    this.data = [];
  }
  async fetchEvents(): Promise<HackEvent[]> {
    return this.data;
  }
}
