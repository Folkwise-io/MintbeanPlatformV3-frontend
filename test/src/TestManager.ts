import { configureStore } from "../../src/views/state/configureStore";
import { testContextBuilder } from "../testContextBuilder";
import { Store, Action } from "redux";

export class TestManager {
  store: Store<StoreState, Action<any>>;
  results: any[];
  private constructor(store: any) {
    this.store = store;
    this.results = [];
  }
  static build(): any {
    const store = configureStore(testContextBuilder());

    return new TestManager(store);
  }

  async dispatch(action: Action<any>): Promise<TestManager> {
    await this.store.dispatch(action);
    return this;
  }

  subscribe(): TestManager {
    this.store.subscribe(() => {
      this.results.push(this.store.getState());
    });
    return this;
  }

  getResults(): any[] {
    return this.results;
  }
}
