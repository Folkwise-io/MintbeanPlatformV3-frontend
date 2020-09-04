import { configureStore } from "../../src/views/state/configureStore";
import { testContextBuilder } from "../testContextBuilder";
import { ThunkAction } from "redux-thunk";
import { TestContext } from "../testContextBuilder";

export class TestManager {
  store: any;
  results: any[];
  context: TestContext;
  private constructor(store: any, context: TestContext) {
    this.store = store;
    this.results = [];
    this.context = context;
  }

  static build(): any {
    const context = testContextBuilder();
    const store = configureStore(context);

    return new TestManager(store, context).subscribe();
  }

  async dispatch(action: ThunkAction<void, StoreState, TestContext, MbAction>): Promise<TestManager> {
    await this.store.dispatch(action);
    return this;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  addUser(data: any): TestManager {
    this.context.userDao.data = data;
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
