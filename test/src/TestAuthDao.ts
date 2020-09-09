import { AuthDao } from "daos/AuthDao";

export class TestAuthDao implements AuthDao {
  data: any;
  constructor() {
    this.data = null;
  }

  async login(): Promise<any> {
    return this.data;
  }
}
