import { configureStore } from "../../src/views/state/configureStore";
import { testContextBuilder } from "../testContextBuilder";
import { ThunkAction } from "redux-thunk";
import { Context } from "context/contextBuilder";

export class TestManager {
  store: any;
  results: any[];
  private constructor(store: any) {
    this.store = store;
    this.results = [];
  }
  static build(): any {
    const store = configureStore(testContextBuilder());

    return new TestManager(store).subscribe();
  }

  async dispatch(action: ThunkAction<void, StoreState, Context, MbAction>): Promise<TestManager> {
    await this.store.dispatch(action);
    return this;
  }

  private subscribe(): TestManager {
    this.store.subscribe(() => {
      this.results.push(this.store.getState());
    });
    return this;
  }

  getResults(): any[] {
    return this.results;
  }
}
